import {
  getCacheKey,
  getCacheKeyAndFilterUntyped,
  ModelOfCacheKeyBase,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { groupCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/group';
import {
  MULTI_SELECTOR_INCREMENT_ID,
  MULTI_SELECTOR_START,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/multiSelect';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';

type GroupConfigurationT = {
  [key in string]: {
    readonly configuration: ConfigurationT;
    readonly position: number;
    readonly heading?: string;
  };
};

type MultiSelectConfigurationT = readonly [
  configuration: ConfigurationT,
  id: string
];

type FakeMultiSelectConfigurationT = readonly [configuration: ConfigurationT];

type BaseConfigurationT =
  | StoreCacheKeyBaseEnum.algorithm
  | StoreCacheKeyBaseEnum.dataset
  | StoreCacheKeyBaseEnum.experiment
  | StoreCacheKeyBaseEnum.groundTruth
  | StoreCacheKeyBaseEnum.similarityFunction
  | StoreCacheKeyBaseEnum.similarityThreshold;

type ConfigurationT =
  | GroupConfigurationT
  | MultiSelectConfigurationT
  | FakeMultiSelectConfigurationT
  | BaseConfigurationT;

type GroupConfigurationValue<GroupConfiguration extends GroupConfigurationT> = {
  [key in keyof GroupConfiguration]: ConfigurationValue<
    GroupConfiguration[key]['configuration']
  >;
};

type MultiSelectConfigurationValue<
  MultiSelectConfiguration extends MultiSelectConfigurationT
> = ConfigurationValue<MultiSelectConfiguration[0]>[];

type FakeMultiSelectConfigurationValue<
  FakeMultiSelectConfiguration extends FakeMultiSelectConfigurationT
> = ConfigurationValue<FakeMultiSelectConfiguration[0]>;

type BaseConfigurationValue<
  BaseConfiguration extends BaseConfigurationT
> = ModelOfCacheKeyBase<BaseConfiguration>[];

type ConfigurationValue<
  Configuration extends ConfigurationT
> = Configuration extends BaseConfigurationT
  ? BaseConfigurationValue<Configuration>
  : Configuration extends GroupConfigurationT
  ? GroupConfigurationValue<Configuration>
  : Configuration extends MultiSelectConfigurationT
  ? MultiSelectConfigurationValue<Configuration>
  : Configuration extends FakeMultiSelectConfigurationT
  ? FakeMultiSelectConfigurationValue<Configuration>
  : never;

export function buildAnyConfigurator<Configuration extends ConfigurationT>(
  configuration: Configuration,
  outerMultiSelects: number[]
): {
  cacheKey: StoreCacheKey;
  getValue(state: BenchmarkAppModel): ConfigurationValue<Configuration>;
} {
  let cacheKey: StoreCacheKey;
  if (Array.isArray(configuration)) {
    if (configuration.length === 1) {
      cacheKey = buildAnyConfigurator(configuration[0], [
        ...outerMultiSelects,
        MULTI_SELECTOR_START,
      ]).cacheKey;
    } else {
      cacheKey = getCacheKey(
        StoreCacheKeyBaseEnum.multiSelect,
        configuration[1],
        outerMultiSelects,
        ...buildAnyConfigurator(configuration[0], [
          ...outerMultiSelects.map(() => MULTI_SELECTOR_INCREMENT_ID),
          MULTI_SELECTOR_INCREMENT_ID,
        ]).cacheKey
      );
    }
  } else if (typeof configuration === 'object') {
    cacheKey = getCacheKey(
      StoreCacheKeyBaseEnum.group,
      outerMultiSelects,
      ...Object.entries(configuration as GroupConfigurationT)
        .sort(([, cA], [, cB]) => cA.position - cB.position)
        .map(
          ([key, { configuration, heading }]) =>
            [
              key,
              buildAnyConfigurator(
                configuration,
                outerMultiSelects.map(() => MULTI_SELECTOR_INCREMENT_ID)
              ).cacheKey,
              heading,
            ] as [string, StoreCacheKey] | [string, StoreCacheKey, string]
        )
    );
  } else {
    cacheKey = getCacheKey(
      configuration as StoreCacheKeyBaseEnum,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(outerMultiSelects as any)
    );
  }
  return {
    cacheKey,
    getValue: (state) =>
      getCacheKeyAndFilterUntyped(cacheKey).getValue(
        state
      ) as ConfigurationValue<Configuration>,
  };
}

export function buildConfigurator<
  Configuration extends GroupConfigurationT | FakeMultiSelectConfigurationT
>(
  configuration: Configuration
): {
  cacheKey: ReturnType<typeof groupCacheKeyAndFilter>['cacheKey'];
  getValue(state: BenchmarkAppModel): ConfigurationValue<Configuration>;
} {
  return buildAnyConfigurator(configuration, []) as {
    cacheKey: ReturnType<typeof groupCacheKeyAndFilter>['cacheKey'];
    getValue(state: BenchmarkAppModel): ConfigurationValue<Configuration>;
  };
}
