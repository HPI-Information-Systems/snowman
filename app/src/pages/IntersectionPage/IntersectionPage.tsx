import IntersectionPageView from 'pages/IntersectionPage/IntersectionPage.View';
import {
  IntersectionPageDispatchProps,
  IntersectionPageStateProps,
} from 'pages/IntersectionPage/IntersectionPageProps';
import { connect } from 'react-redux';
import {
  countsMatchConfiguration,
  getCountsForIntersection,
  intersectionSorter,
  intersectionTuplesLoader,
  loadCounts,
} from 'store/actions/IntersectionStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapStateToProps = ({
  IntersectionStore: { included, excluded, ignored, counts },
  BenchmarkConfigurationStore: {
    selectedDataset,
    chosenExperiments,
    chosenGoldStandards,
  },
}: Store): IntersectionPageStateProps => {
  const sortedConfig = [
    ...included.map(({ id }) => ({
      experimentId: id,
      predictedCondition: true,
    })),
    ...excluded.map(({ id }) => ({
      experimentId: id,
      predictedCondition: false,
    })),
  ].sort(intersectionSorter);
  const configCounts = getCountsForIntersection(counts, sortedConfig);

  if (!selectedDataset) {
    throw new Error('No dataset selected on intersection page');
  }

  return {
    loadTuples: intersectionTuplesLoader(sortedConfig, selectedDataset.id),
    tuplesCount: configCounts?.numberRows ?? 0,
    pairCount: configCounts?.numberPairs ?? 0,
    included,
    excluded,
    ignored: ignored,
    countsLoaded: countsMatchConfiguration(
      counts,
      chosenExperiments,
      chosenGoldStandards
    ),
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): IntersectionPageDispatchProps => {
  return {
    loadCounts() {
      return dispatch(loadCounts());
    },
  };
};

const IntersectionPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntersectionPageView);

export default IntersectionPage;
