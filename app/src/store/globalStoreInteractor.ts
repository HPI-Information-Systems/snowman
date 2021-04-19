import { Store } from 'redux';
import { SnowmanAction, SnowmanDispatch } from 'store/messages';
import { Store as IStore } from 'store/models';
import { store } from 'store/store';

export const SnowmanGlobalSimpleDispatch: SnowmanDispatch = store.dispatch;

export const provideSnowmanStore = (): Store<IStore, SnowmanAction> => store;
