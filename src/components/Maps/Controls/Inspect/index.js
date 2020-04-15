import React from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { t, BungieText, withinString as makeWithinString } from '../../../../utils/i18n';
import manifest from '../../../../utils/manifest';
import ObservedImage from '../../../ObservedImage';
import Records from '../../../Records';
import Button from '../../../UI/Button';
import { bookCovers } from '../../../../utils/destinyEnums';
import { checklists, lookup } from '../../../../utils/checklists';
import { cartographer } from '../../../../utils/maps';

import './styles.css';

function findNodeType({ checklistHash, recordHash, nodeHash, activityHash }) {
  if (checklistHash) {
    return {
      key: 'checklistHash',
      value: checklistHash,
    };
  } else if (recordHash) {
    return {
      key: 'recordHash',
      value: recordHash,
    };
  } else if (nodeHash) {
    return {
      key: 'nodeHash',
      value: nodeHash,
    };
  } else if (activityHash) {
    return {
      key: 'activityHash',
      value: activityHash,
    };
  }
}

function locationStrings({ activityHash, destinationHash, bubbleHash, map }) {
  const definitionActivity = manifest.DestinyActivityDefinition[activityHash];
  const definitionDestination = manifest.DestinyDestinationDefinition[destinationHash];
  const definitionPlace = manifest.DestinyPlaceDefinition[definitionDestination?.placeHash];
  const definitionBubble = definitionDestination?.bubbles?.find((bubble) => bubble.hash === bubbleHash);

  const destinationName = definitionDestination?.displayProperties?.name;
  const placeName = definitionPlace?.displayProperties?.name && definitionPlace.displayProperties.name !== destinationName && definitionPlace.displayProperties.name;
  const bubbleName = definitionBubble?.displayProperties?.name;

  const destinationString = [bubbleName, destinationName, placeName].filter((string) => string).join(', ');

  const within = map?.in;
  const withinName = within === 'ascendant-challenge' ? bubbleName : (within && definitionActivity?.displayProperties?.name) || bubbleName;

  return {
    destinationString,
    withinString: within && makeWithinString(within, withinName),
  };
}

function unify(props) {
  const type = findNodeType(props);

  console.log(type);

  const node = cartographer({ key: type.key, value: type.value });

  console.log(node);

  if (type.key === 'checklistHash' || type.key === 'recordHash') {
    const checklistEntry = lookup(type);

    const checklist = checklistEntry?.checklistId && checklists[checklistEntry.checklistId]({ requested: { key: type.key, array: [checklistEntry[type.key]] } });
    const checklistItem = checklist?.items?.[0];

    console.log(checklist, checklistItem);

    const { destinationString, withinString } = locationStrings(node);

    return {
      ...node,
      related: {
        ...node.related,
        records: [...(node.related?.records || []), { recordHash: checklistItem.recordHash }].filter((record) => record.recordHash),
      },
      displayProperties: {
        ...node.displayProperties,
        name: `${checklistItem.formatted.name}${checklistItem.formatted.suffix ? ` ${checklistItem.formatted.suffix}` : ``}`,
      },
      type: {
        name: checklist?.checklistItemName,
      },
      destinationString,
      withinString,
    };
  } else if (type.key === 'nodeHash') {
    const { destinationString, withinString } = locationStrings(node);

    return {
      ...node,
      destinationString,
      withinString,
    };
  } else if (type.key === 'activityHash') {
    const { destinationString, withinString } = locationStrings(node);
    const definitionActivity = manifest.DestinyActivityDefinition[type.value];

    return {
      ...node,
      related: {
        ...node.related,
        records: [...(node.related?.records || []), ...node.checklistItems?.filter((checklistItem) => checklistItem.recordHash).map((checklistItem) => ({ recordHash: checklistItem.recordHash }))],
      },
      displayProperties: definitionActivity.originalDisplayProperties || definitionActivity.displayProperties,
      type: {
        name: manifest.DestinyActivityTypeDefinition[definitionActivity.activityTypeHash]?.displayProperties.name,
      },
      screenshot: `https://www.bungie.net${definitionActivity.pgcrImage}`,
      activityLightLevel: definitionActivity.activityLightLevel,
      destinationString,
      withinString,
    };
  } else {
    return {
      displayProperties: {},
      type: {},
    };
  }
}

class Inspect extends React.Component {
  state = {};

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate(p, s) {}

  render() {
    const unified = unify(this.props);

    console.log(unified);

    return (
      <div className='control inspector acrylic'>
        <div className='close'>
          <Button action={this.props.handler}>
            <i className='segoe-uniE8BB' />
          </Button>
        </div>
        <div className='wrapper'>
          <div className='screenshot'>{unified.screenshot ? <ObservedImage src={unified.screenshot} /> : <div className='info'>{t('Screenshot unavailable')}</div>}</div>
          <div className='header'>
            <div className='type'>{unified.type.name}</div>
            <div className='name'>{unified.displayProperties.name}</div>
            {unified.displayProperties.description ? <BungieText className='description' source={unified.displayProperties.description} /> : null}
          </div>
          {unified.withinString ? <div className='within'>{unified.withinString}</div> : null}
          {unified.destinationString ? <div className='destination'>{unified.destinationString}</div> : null}
          <div className={cx({ buffer: unified.related?.records.length })}>
            {unified.related?.records.length ? (
              <>
                <h4>{t('Triumphs')}</h4>
                <ul className='list record-items'>
                  <Records selfLinkFrom={this.props.location.pathname} hashes={unified.related.records.map((record) => record.recordHash)} ordered />
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    member: state.member,
    collectibles: state.collectibles,
    viewport: state.viewport,
    settings: state.maps,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rebindTooltips: (value) => {
      dispatch({ type: 'REBIND_TOOLTIPS', payload: new Date().getTime() });
    },
  };
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Inspect);
