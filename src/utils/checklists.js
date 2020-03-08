import React from 'react';
import { orderBy } from 'lodash';

import store from '../store';
import { t } from './i18n';

import data from '../data/lowlines/checklists';
import manifest from './manifest';
import { enumerateRecordState } from './destinyEnums';
import { Maps } from '../svg';

export const checklists = {
  // adventures
  4178338182: options =>
    checklist({
      checklistId: 4178338182,
      items: checklistItems(4178338182, true),
      characterBound: true,
      itemName: i => {
        if (!manifest.DestinyActivityDefinition[i.activityHash]) console.log(i);
        return manifest.DestinyActivityDefinition[i.activityHash] && manifest.DestinyActivityDefinition[i.activityHash].displayProperties.name;
      },
      itemLocation: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionBubble = definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName].filter(s => s).join(', ');
      },
      itemLocationExt: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionPlace = definitionDestination && manifest.DestinyPlaceDefinition[definitionDestination.placeHash];
        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const placeName = definitionPlace && definitionPlace.displayProperties.name && definitionPlace.displayProperties.name !== definitionDestination.displayProperties.name && definitionPlace.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName, placeName].filter(s => s).join(', ');
      },
      sortBy: ['completed', 'destination', 'bubble', 'name'],
      checklistItemName: t('Adventure'),
      checklistItemName_plural: t('Adventures'),
      checklistIcon: <Maps.Adventure />,
      checklistProgressDescription: t('Adventures undertaken'),
      ...options
    }),
  // region chests
  1697465175: options =>
    numberedChecklist(t('Region Chest'), {
      checklistId: 1697465175,
      characterBound: true,
      items: checklistItems(1697465175, true),
      sortBy: ['completed', 'number'],
      itemLocation: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionBubble = definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName].filter(s => s).join(', ');
      },
      itemLocationExt: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionPlace = definitionDestination && manifest.DestinyPlaceDefinition[definitionDestination.placeHash];
        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const placeName = definitionPlace && definitionPlace.displayProperties.name && definitionPlace.displayProperties.name !== definitionDestination.displayProperties.name && definitionPlace.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName, placeName].filter(s => s).join(', ');
      },
      checklistItemName: t('Region Chest'),
      checklistItemName_plural: t('Region Chests'),
      checklistIcon: <Maps.RegionChest />,
      checklistProgressDescription: t('Chests opened'),
      ...options
    }),
  // lost sectors
  3142056444: options =>
    checklist({
      checklistId: 3142056444,
      characterBound: true,
      items: checklistItems(3142056444, true),
      sortBy: ['completed', 'destination', 'name'],
      itemName: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionBubble = definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return bubbleName;
      },
      itemLocation: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];

        const destinationName = definitionDestination.displayProperties.name;

        return destinationName;
      },
      itemLocationExt: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionPlace = definitionDestination && manifest.DestinyPlaceDefinition[definitionDestination.placeHash];
        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const placeName = definitionPlace && definitionPlace.displayProperties.name && definitionPlace.displayProperties.name !== definitionDestination.displayProperties.name && definitionPlace.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName, placeName].filter(s => s).join(', ');
      },
      checklistItemName: t('Lost Sector'),
      checklistItemName_plural: t('Lost Sectors'),
      checklistIcon: <Maps.LostSector />,
      checklistProgressDescription: t('Discovered_plural'),
      ...options
    }),
  // ahamkara bones
  1297424116: options =>
    checklist({
      checklistId: 1297424116,
      items: checklistItems(1297424116),
      // sortBy: ['number'],
      itemName: i => {
        const definitionRecord = manifest.DestinyRecordDefinition[i.recordHash];
        const definitionLore = manifest.DestinyLoreDefinition[definitionRecord.loreHash];

        return definitionLore.displayProperties.name;
      },
      itemLocation: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionBubble = definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName].filter(s => s).join(', ');
      },
      itemLocationExt: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionPlace = definitionDestination && manifest.DestinyPlaceDefinition[definitionDestination.placeHash];
        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const placeName = definitionPlace && definitionPlace.displayProperties.name && definitionPlace.displayProperties.name !== definitionDestination.displayProperties.name && definitionPlace.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName, placeName].filter(s => s).join(', ');
      },
      checklistItemName: t('Ahamkara Bones'),
      checklistItemName_plural: t('Ahamkara Bones'),
      checklistIcon: <Maps.AhamkaraBones />,
      checklistProgressDescription: t('Bones found'),
      ...options
    }),
  // corrupted eggs
  2609997025: options =>
    numberedChecklist(t('Egg'), {
      checklistId: 2609997025,
      items: checklistItems(2609997025, false),
      itemLocation: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionBubble = definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName].filter(s => s).join(', ');
      },
      itemLocationExt: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionPlace = definitionDestination && manifest.DestinyPlaceDefinition[definitionDestination.placeHash];
        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const placeName = definitionPlace && definitionPlace.displayProperties.name && definitionPlace.displayProperties.name !== definitionDestination.displayProperties.name && definitionPlace.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName, placeName].filter(s => s).join(', ');
      },
      checklistItemName: t('Corrupted Egg'),
      checklistItemName_plural: t('Corrupted Eggs'),
      checklistIcon: <Maps.CorruptedEgg />,
      checklistProgressDescription: t('Eggs destroyed'),
      ...options
    }),
  // cat statues
  2726513366: options =>
    numberedChecklist(t('Feline friend'), {
      checklistId: 2726513366,
      items: checklistItems(2726513366),
      itemLocation: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionBubble = definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName].filter(s => s).join(', ');
      },
      itemLocationExt: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionPlace = definitionDestination && manifest.DestinyPlaceDefinition[definitionDestination.placeHash];
        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const placeName = definitionPlace && definitionPlace.displayProperties.name && definitionPlace.displayProperties.name !== definitionDestination.displayProperties.name && definitionPlace.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName, placeName].filter(s => s).join(', ');
      },
      checklistItemName: t('Cat Statue'),
      checklistItemName_plural: t('Cat Statues'),
      checklistIcon: <Maps.FelineFriend />,
      checklistProgressDescription: t('Feline friends satisfied'),
      ...options
    }),
  // jade rabbits
  1912364094: options =>
    numberedChecklist(t('Jade Rabbit'), {
      checklistId: 1912364094,
      characterBound: true,
      items: checklistItems(1912364094, true),
      itemLocation: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName].filter(s => s).join(', ');
      },
      itemLocationExt: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionPlace = definitionDestination && manifest.DestinyPlaceDefinition[definitionDestination.placeHash];
        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const placeName = definitionPlace && definitionPlace.displayProperties.name && definitionPlace.displayProperties.name !== definitionDestination.displayProperties.name && definitionPlace.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName, placeName].filter(s => s).join(', ');
      },
      checklistItemName: t('Jade Rabbit'),
      checklistItemName_plural: t('Jade Rabbits'),
      checklistIcon: <Maps.JadeRabbit />,
      checklistProgressDescription: t('Rabbits with rice cake'),
      ...options
    }),
  // sleeper nodes
  365218222: options =>
    checklist({
      checklistId: 365218222,
      items: checklistItems(365218222),
      sortBy: ['name', 'destination', 'bubble'],
      itemName: i => ['CB.NAV/RUN.()', 'CB.NAV/EXÉC.()', 'CB.NAV/EJECUTAR.()', 'CB.NAV/ESEGUI.()', 'КБ.НАВ/ЗАПУСК().'].reduce((a, v) => a.replace(v, ''), manifest.DestinyInventoryItemDefinition[i.itemHash].displayProperties.description),
      itemLocation: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionBubble = definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName].filter(s => s).join(', ');
      },
      itemLocationExt: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionPlace = definitionDestination && manifest.DestinyPlaceDefinition[definitionDestination.placeHash];
        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const placeName = definitionPlace && definitionPlace.displayProperties.name && definitionPlace.displayProperties.name !== definitionDestination.displayProperties.name && definitionPlace.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName, placeName].filter(s => s).join(', ');
      },
      checklistItemName: t('Sleeper Node'),
      checklistItemName_plural: t('Sleeper Nodes'),
      checklistIcon: <Maps.SleperNode />,
      checklistProgressDescription: t('Nodes hacked'),
      ...options
    }),
  // ghost scans
  2360931290: options =>
    numberedChecklist(t('Scan'), {
      checklistId: 2360931290,
      items: checklistItems(2360931290),
      itemLocation: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionBubble = definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName].filter(s => s).join(', ');
      },
      itemLocationExt: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionPlace = definitionDestination && manifest.DestinyPlaceDefinition[definitionDestination.placeHash];
        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const placeName = definitionPlace && definitionPlace.displayProperties.name && definitionPlace.displayProperties.name !== definitionDestination.displayProperties.name && definitionPlace.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName, placeName].filter(s => s).join(', ');
      },
      checklistItemName: t('Ghost Scan'),
      checklistItemName_plural: t('Ghost Scans'),
      checklistIcon: <Maps.GhostScan />,
      checklistProgressDescription: t('Scans performed'),
      ...options
    }),
  // latent memories
  2955980198: options =>
    numberedChecklist(t('Memory'), {
      checklistId: 2955980198,
      items: checklistItems(2955980198),
      itemLocation: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionBubble = definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName].filter(s => s).join(', ');
      },
      itemLocationExt: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionPlace = definitionDestination && manifest.DestinyPlaceDefinition[definitionDestination.placeHash];
        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const placeName = definitionPlace && definitionPlace.displayProperties.name && definitionPlace.displayProperties.name !== definitionDestination.displayProperties.name && definitionPlace.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName, placeName].filter(s => s).join(', ');
      },
      checklistItemName: t('Lost Memory Fragment'),
      checklistItemName_plural: t('Lost Memory Fragments'),
      checklistIcon: <Maps.LostMemoryFragment />,
      checklistProgressDescription: t('Memories resolved'),
      ...options
    }),
  // lore: ghost stories
  1420597821: options =>
    checklist({
      checklistId: 1420597821,
      items: presentationItems(1420597821),
      sortBy: ['completed', 'number'],
      itemName: i => {
        const definitionRecord = manifest.DestinyRecordDefinition[i.recordHash];
        const definitionLore = manifest.DestinyLoreDefinition[definitionRecord.loreHash];

        return definitionLore.displayProperties.name;
      },
      itemLocation: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionBubble = definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName].filter(s => s).join(', ');
      },
      itemLocationExt: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionPlace = definitionDestination && manifest.DestinyPlaceDefinition[definitionDestination.placeHash];
        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const placeName = definitionPlace && definitionPlace.displayProperties.name && definitionPlace.displayProperties.name !== definitionDestination.displayProperties.name && definitionPlace.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName, placeName].filter(s => s).join(', ');
      },
      checklistItemName: `${t('Lore')}: ${manifest.DestinyPresentationNodeDefinition[1420597821].displayProperties.name}`,
      checklistItemName_plural: `${t('Lore')}: ${manifest.DestinyPresentationNodeDefinition[1420597821].displayProperties.name}`,
      checklistIcon: <Maps.Record />,
      checklistImage: '/static/images/extracts/ui/checklists/037e-00004869.png',
      checklistProgressDescription: t('Stories read'),
      ...options
    }),
  // lore: awoken of the reef
  3305936921: options =>
    checklist({
      checklistId: 3305936921,
      items: presentationItems(3305936921),
      sortBy: ['completed', 'number'],
      itemName: i => {
        const definitionRecord = manifest.DestinyRecordDefinition[i.recordHash];
        const definitionLore = manifest.DestinyLoreDefinition[definitionRecord.loreHash];

        return definitionLore.displayProperties.name;
      },
      itemLocation: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionBubble = definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName].filter(s => s).join(', ');
      },
      itemLocationExt: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionPlace = definitionDestination && manifest.DestinyPlaceDefinition[definitionDestination.placeHash];
        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const placeName = definitionPlace && definitionPlace.displayProperties.name && definitionPlace.displayProperties.name !== definitionDestination.displayProperties.name && definitionPlace.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName, placeName].filter(s => s).join(', ');
      },
      checklistItemName: `${t('Lore')}: ${manifest.DestinyPresentationNodeDefinition[3305936921].displayProperties.name}`,
      checklistItemName_plural: `${t('Lore')}: ${manifest.DestinyPresentationNodeDefinition[3305936921].displayProperties.name}`,
      checklistIcon: <Maps.Record />,
      checklistImage: '/static/images/extracts/ui/checklists/037e-00004874.png',
      checklistProgressDescription: t('Crystals resolved'),
      ...options
    }),
  // lore: forsaken prince
  655926402: options =>
    checklist({
      checklistId: 655926402,
      items: presentationItems(655926402),
      sortBy: ['completed', 'number'],
      itemName: i => {
        const definitionRecord = manifest.DestinyRecordDefinition[i.recordHash];
        const definitionLore = manifest.DestinyLoreDefinition[definitionRecord.loreHash];

        return definitionLore.displayProperties.name;
      },
      itemLocation: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];

        if (!definitionDestination) {
          return <em>{t('Forsaken campaign')}</em>;
        }

        const definitionBubble = definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName].filter(s => s).join(', ');
      },
      itemLocationExt: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionPlace = definitionDestination && manifest.DestinyPlaceDefinition[definitionDestination.placeHash];
        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const placeName = definitionPlace && definitionPlace.displayProperties.name && definitionPlace.displayProperties.name !== definitionDestination.displayProperties.name && definitionPlace.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        return [bubbleName, destinationName, placeName].filter(s => s).join(', ');
      },
      checklistItemName: `${t('Lore')}: ${manifest.DestinyPresentationNodeDefinition[655926402].displayProperties.name}`,
      checklistItemName_plural: `${t('Lore')}: ${manifest.DestinyPresentationNodeDefinition[655926402].displayProperties.name}`,
      checklistIcon: <Maps.Record />,
      checklistImage: '/static/images/extracts/ui/checklists/037e-00004886.png',
      checklistProgressDescription: t('Data caches decrypted'),
      ...options
    }),
  // lore: lunas lost
  4285512244: options =>
    checklist({
      checklistId: 4285512244,
      items: presentationItems(4285512244),
      sortBy: ['completed', 'number'],
      itemName: i => {
        const definitionRecord = manifest.DestinyRecordDefinition[i.recordHash];
        const definitionLore = manifest.DestinyLoreDefinition[definitionRecord.loreHash];

        return definitionLore.displayProperties.name;
      },
      itemLocation: i => {
        const definitionDestination = i.destinationHash && manifest.DestinyDestinationDefinition[i.destinationHash];

        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        const destinationActivity = i.activityHash && manifest.DestinyActivityDefinition[i.activityHash];
        const activityName = (destinationActivity && destinationActivity.displayProperties && destinationActivity.displayProperties.name) || false;

        return [activityName, bubbleName, destinationName].filter(s => s).join(', ');
      },
      itemLocationExt: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionPlace = definitionDestination && manifest.DestinyPlaceDefinition[definitionDestination.placeHash];
        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const placeName = definitionPlace && definitionPlace.displayProperties.name && definitionPlace.displayProperties.name !== definitionDestination.displayProperties.name && definitionPlace.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        const destinationActivity = i.activityHash && manifest.DestinyActivityDefinition[i.activityHash];
        const activityName = (destinationActivity && destinationActivity.displayProperties && destinationActivity.displayProperties.name) || false;

        return [activityName, bubbleName, destinationName, placeName].filter(s => s).join(', ');
      },
      checklistItemName: `${t('Lore')}: ${manifest.DestinyPresentationNodeDefinition[4285512244].displayProperties.name}`,
      checklistItemName_plural: `${t('Lore')}: ${manifest.DestinyPresentationNodeDefinition[4285512244].displayProperties.name}`,
      checklistIcon: <Maps.Record />,
      checklistImage: '/static/images/extracts/ui/checklists/0597_02D2_00.png',
      checklistProgressDescription: t('Ghost fragments recovered'),
      ...options
    }),
  // lore: inquisition of the damned
  2474271317: options =>
    checklist({
      checklistId: 2474271317,
      items: presentationItems(2474271317),
      sortBy: ['completed', 'number'],
      itemName: i => {
        const definitionRecord = manifest.DestinyRecordDefinition[i.recordHash];
        const definitionLore = manifest.DestinyLoreDefinition[definitionRecord.loreHash];

        return definitionLore.displayProperties.name;
      },
      itemLocation: i => {
        const definitionDestination = i.destinationHash && manifest.DestinyDestinationDefinition[i.destinationHash];

        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        const destinationActivity = i.activityHash && manifest.DestinyActivityDefinition[i.activityHash];
        const activityName = (destinationActivity && destinationActivity.displayProperties && destinationActivity.displayProperties.name) || false;

        return [activityName, bubbleName, destinationName].filter(s => s).join(', ');
      },
      itemLocationExt: i => {
        const definitionDestination = manifest.DestinyDestinationDefinition[i.destinationHash];
        const definitionPlace = definitionDestination && manifest.DestinyPlaceDefinition[definitionDestination.placeHash];
        const definitionBubble = definitionDestination && definitionDestination.bubbles.find(b => b.hash === i.bubbleHash);

        const destinationName = definitionDestination && definitionDestination.displayProperties.name;
        const placeName = definitionPlace && definitionPlace.displayProperties.name && definitionPlace.displayProperties.name !== definitionDestination.displayProperties.name && definitionPlace.displayProperties.name;
        const bubbleName = (definitionBubble && definitionBubble.displayProperties && definitionBubble.displayProperties.name) || i.bubbleName;

        const destinationActivity = i.activityHash && manifest.DestinyActivityDefinition[i.activityHash];
        const activityName = (destinationActivity && destinationActivity.displayProperties && destinationActivity.displayProperties.name) || false;

        return [activityName, bubbleName, destinationName, placeName].filter(s => s).join(', ');
      },
      checklistItemName: `${t('Lore')}: ${manifest.DestinyPresentationNodeDefinition[2474271317].displayProperties.name}`,
      checklistItemName_plural: `${t('Lore')}: ${manifest.DestinyPresentationNodeDefinition[2474271317].displayProperties.name}`,
      checklistIcon: <Maps.Record />,
      checklistImage: '/static/images/extracts/ui/checklists/0597_02CC_00.png',
      checklistProgressDescription: t('Necrotic cyphers collected'),
      ...options
    })
};

export default checklists;

export function lookup(item) {
  const checklistId = Object.keys(data).find(key => data[key].find(entry => entry[item.key] === parseInt(item.value, 10)));
  const checklistEntry = checklistId && data[checklistId].find(entry => entry[item.key] === parseInt(item.value, 10));

  if (checklistEntry) {
    return {
      checklistId,
      [item.key]: checklistEntry && checklistEntry[item.key]
    };
  } else {
    return {};
  }
}

function checklist(options = {}) {
  const defaultOptions = {
    characterBound: false
  };

  options = { ...defaultOptions, ...options };

  const items = options.sortBy
    ? orderBy(options.items, [
        i =>
          options.sortBy.map(key => {
            if (key === 'number') {
              return { number: Number };
            } else {
              return i.sorts[key];
            }
          })
      ])
    : options.items;

  const response = options.requested && options.requested.key ? items.filter(i => options.requested.array.indexOf(i[options.requested.key]) > -1) : items;

  return {
    checklistId: options.checklistId,
    checklistItemName: options.checklistItemName,
    checklistItemName_plural: options.checklistItemName_plural,
    checklistIcon: options.checklistIcon,
    checklistImage: options.checklistImage,
    checklistProgressDescription: options.checklistProgressDescription,
    checklistCharacterBound: options.characterBound,
    totalItems: items.length,
    completedItems: items.filter(i => i.completed).length,
    items: response.map(i => ({
      ...i,
      formatted: {
        suffix: options.numbered ? i.sorts.number : '',
        number: i.sorts.number,
        name: options.itemName(i),
        location: options.itemLocation(i),
        locationExt: options.itemLocationExt(i)
      },
      completed: i.completed
    }))
  };
}

function numberedChecklist(name, options = {}) {
  return checklist({
    // sortBy: ['number'],
    numbered: true,
    itemName: i => name,
    ...options
  });
}

function checklistItems(checklistId, isCharacterBound) {
  const state = store.getState();
  const characterId = state.member.characterId;
  const profile = state.member.data && state.member.data.profile;

  const progressionSource = profile ? (isCharacterBound ? profile.characterProgressions.data[characterId] : profile.profileProgression.data) : false;
  const progression = progressionSource && progressionSource.checklists[checklistId];

  return data[checklistId].map(entry => {
    const completed = progression[entry.checklistHash];

    entry.sorts.completed = completed;

    return {
      ...entry,
      completed: completed
    };
  });
}

function presentationItems(presentationHash, dropFirst = true) {
  const state = store.getState();
  const characterId = state.member.characterId;
  const profile = state.member.data && state.member.data.profile;

  const profileRecords = profile && profile.profileRecords.data.records;
  const characterRecords = profile && profile.characterRecords.data;

  return data[presentationHash]
    .map(entry => {
      const definitionRecord = manifest.DestinyRecordDefinition[entry.recordHash];
      const recordScope = definitionRecord.scope || 0;
      const recordData = recordScope === 1 ? characterRecords && characterRecords[characterId].records[definitionRecord.hash] : profileRecords && profileRecords[definitionRecord.hash];

      const enumerableState = recordData && Number.isInteger(recordData.state) ? recordData.state : 4;

      const completed = enumerableState && !enumerateRecordState(enumerableState).objectiveNotCompleted;

      return {
        ...entry,
        completed: completed
      };
    })
    .filter(i => i);
}
