import {
  getCacheKey,
  getCacheKeyAndFilterUntyped,
  ModelOfCacheKeyBase,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MULTI_SELECTOR_INCREMENT_ID } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/multiSelect';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';

type GroupConfigurationT = {
  [key in string]: {
    readonly configuration: ConfigurationT;
    readonly position: number;
    readonly heading?: string;
  };
};

type MultiSelectConfigurationT = readonly [ConfigurationT];

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
  | BaseConfigurationT;

type GroupConfigurationValue<GroupConfiguration extends GroupConfigurationT> = {
  [key in keyof GroupConfiguration]: ConfigurationValue<
    GroupConfiguration[key]['configuration']
  >;
};

type MultiSelectConfigurationValue<
  MultiSelectConfiguration extends MultiSelectConfigurationT
> = ConfigurationValue<MultiSelectConfiguration[0]>[];

type BaseConfigurationValue<
  BaseConfiguration extends BaseConfigurationT
> = ModelOfCacheKeyBase<BaseConfiguration>;

type ConfigurationValue<
  Configuration extends ConfigurationT
> = Configuration extends BaseConfigurationT
  ? BaseConfigurationValue<Configuration>
  : Configuration extends GroupConfigurationT
  ? GroupConfigurationValue<Configuration>
  : Configuration extends MultiSelectConfigurationT
  ? MultiSelectConfigurationValue<Configuration>
  : never;

function buildConfigurator<Configuration extends ConfigurationT>(
  configuration: Configuration,
  multiSelectCount = 0
): {
  cacheKey: StoreCacheKey;
  getValue(state: BenchmarkAppModel): ConfigurationValue<Configuration>;
} {
  let cacheKey: StoreCacheKey;
  if (Array.isArray(configuration)) {
    cacheKey = getCacheKey(
      StoreCacheKeyBaseEnum.multiSelect,
      ...buildConfigurator(configuration[0], multiSelectCount + 1).cacheKey
    );
  } else if (typeof configuration === 'object') {
    cacheKey = getCacheKey(
      StoreCacheKeyBaseEnum.group,
      Array(multiSelectCount).fill(MULTI_SELECTOR_INCREMENT_ID),
      ...Object.entries(configuration as GroupConfigurationT)
        .sort(([, cA], [, cB]) => cA.position - cB.position)
        .map(
          ([
            key,
            {
              configuration,
              heading,
              // TODO heading
            },
          ]) =>
            [
              key,
              buildConfigurator(configuration, multiSelectCount).cacheKey,
            ] as [string, StoreCacheKey]
        )
    );
  } else {
    cacheKey = getCacheKey(
      configuration,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(Array(multiSelectCount).fill(MULTI_SELECTOR_INCREMENT_ID) as any)
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

const a = buildConfigurator({
  test: {
    configuration: [[StoreCacheKeyBaseEnum.algorithm]],
    position: 1,
  },
  test2: {
    configuration: StoreCacheKeyBaseEnum.dataset,
    position: 2,
  },
});
