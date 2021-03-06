import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import cx from 'classnames';

import manifest from '../../utils/manifest';
import ObservedImage from '../ObservedImage';

import './styles.css';

class PlugSet extends React.Component {
  constructor(props) {
    super(props);

    this.scrollToRecordRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.highlight && this.scrollToRecordRef.current !== null) {
      window.scrollTo({
        top: this.scrollToRecordRef.current.offsetTop + this.scrollToRecordRef.current.offsetHeight / 2 - window.innerHeight / 2,
      });
    }
  }

  componentDidUpdate(p) {
    if (p.settings.itemVisibility !== this.props.settings.itemVisibility) {
      this.props.rebindTooltips();
    }
  }

  render() {
    const { t, settings, member, set, plugs, showCompleted } = this.props;

    let hashSet = set;
    if (/^emotes_/.test(set)) hashSet = '3224618006';

    const data = member.data.profile.profilePlugSets && member.data.profile.profilePlugSets.data && member.data.profile.profilePlugSets.data.plugs[hashSet];

    if (!data) return null;

    let output = [];

    plugs.forEach((hash) => {
      const definitionItem = manifest.DestinyInventoryItemDefinition[hash];

      const completed = data.find((p) => p.plugItemHash === definitionItem.hash && p.enabled);

      if (settings.itemVisibility.hideCompletedCollectibles && completed && !showCompleted) {
        return;
      }

      output.push(
        <li
          key={definitionItem.hash}
          className={cx('tooltip', {
            completed,
          })}
          data-hash={definitionItem.hash}
        >
          <div className='icon'>
            <ObservedImage className={cx('image', 'icon')} src={`https://www.bungie.net${definitionItem.displayProperties.icon}`} />
          </div>
          <div className='text'>
            <div className='name'>{definitionItem.displayProperties.name}</div>
            {/* <div className='gfg'>{definitionItem.hash}</div> */}
          </div>
        </li>
      );
    });

    if (output.length === 0 && settings.itemVisibility.hideCompletedCollectibles && !showCompleted) {
      output.push(
        <li key='lol' className='all-completed'>
          <div className='properties'>
            <div className='text'>{t('All discovered')}</div>
          </div>
        </li>
      );
    }

    return output;
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    member: state.member,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rebindTooltips: (value) => {
      dispatch({ type: 'REBIND_TOOLTIPS', payload: new Date().getTime() });
    },
  };
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withTranslation())(PlugSet);
