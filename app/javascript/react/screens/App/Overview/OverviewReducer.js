import Immutable from 'seamless-immutable';

import {
  SHOW_MAPPING_WIZARD,
  HIDE_MAPPING_WIZARD,
  MAPPING_WIZARD_EXITED,
  SHOW_PLAN_WIZARD,
  HIDE_PLAN_WIZARD,
  PLAN_WIZARD_EXITED,
  FETCH_PROVIDERS,
  FETCH_V2V_TRANSFORMATION_MAPPINGS,
  FETCH_V2V_TRANSFORMATION_PLANS,
  FETCH_V2V_ARCHIVED_TRANSFORMATION_PLANS,
  FETCH_V2V_ALL_REQUESTS_WITH_TASKS,
  FETCH_V2V_ALL_ARCHIVED_PLAN_REQUESTS_WITH_TASKS,
  CREATE_V2V_TRANSFORMATION_PLAN_REQUEST,
  V2V_FETCH_CLUSTERS,
  CONTINUE_TO_PLAN,
  V2V_SET_MIGRATIONS_FILTER,
  V2V_RETRY_MIGRATION,
  SHOW_DELETE_CONFIRMATION_MODAL,
  HIDE_DELETE_CONFIRMATION_MODAL,
  SET_MAPPING_TO_DELETE,
  YES_TO_DELETE_AND_HIDE_DELETE_CONFIRMATION_MODAL,
  DELETE_INFRASTRUCTURE_MAPPING,
  SHOW_CONFIRM_MODAL,
  HIDE_CONFIRM_MODAL,
  MIGRATIONS_FILTERS,
  ARCHIVE_TRANSFORMATION_PLAN,
  FETCH_NETWORKS,
  FETCH_DATASTORES
} from './OverviewConstants';

export const initialState = Immutable({
  mappingWizardVisible: false,
  hideMappingWizard: true,
  planWizardVisible: false,
  hidePlanWizard: true,
  planWizardId: null,
  hasSufficientProviders: false,
  isRejectedProviders: false,
  isFetchingProviders: false,
  errorProviders: null,
  transformationMappings: [],
  isRejectedTransformationMappings: false,
  isFetchingTransformationMappings: false,
  transformationPlans: [],
  isRejectedTransformationPlans: false,
  isFetchingTransformationPlans: false,
  errorTransformationPlans: null,
  allRequestsWithTasks: [],
  isRejectedAllRequestsWithTasks: false,
  isFetchingAllRequestsWithTasks: false,
  errorAllRequestsWithTasks: null,
  requestsWithTasksPreviouslyFetched: false,
  archivedTransformationPlans: [],
  isRejectedArchivedTransformationPlans: false,
  isFetchingArchivedTransformationPlans: '',
  errorArchivedTransformationPlans: null,
  allArchivedPlanRequestsWithTasks: [],
  isRejectedAllArchivedPlanRequestsWithTasks: false,
  isFetchingAllArchivedPlanRequestsWithTasks: false,
  errorAllArchivedPlanRequestsWithTasks: null,
  createTransformationPlanRequestResponse: {},
  isRejectedCreateTranformationPlanRequest: false,
  isCreatingTransformationPlanRequest: null,
  errorCreateTransformationPlanRequest: null,
  isContinuingToPlan: false,
  shouldReloadMappings: false,
  clusters: [],
  migrationsFilter: MIGRATIONS_FILTERS.notStarted,
  showDeleteConfirmationModal: false,
  confirmModalVisible: false,
  confirmModalOptions: {},
  isArchivingTransformationPlan: false,
  isRejectedArchivingTransformationPlan: false,
  errorArchivingTransformationPlan: null,
  isFetchingClusters: false,
  isRejectedClusters: false,
  datastores: [],
  isFetchingDatastores: false,
  isRejectedDatastores: false,
  networks: [],
  isFetchingNetworks: false,
  isRejectedNetworks: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CONFIRM_MODAL:
      return state
        .set('confirmModalOptions', action.payload)
        .set('confirmModalVisible', true);
    case HIDE_CONFIRM_MODAL:
      return state.set('confirmModalVisible', false);
    case SHOW_MAPPING_WIZARD:
      return Immutable.merge(state, {
        mappingWizardVisible: true,
        hideMappingWizard: false
      });
    case HIDE_MAPPING_WIZARD: {
      const { payload } = action;
      return state
        .set('hideMappingWizard', true)
        .set(
          'shouldReloadMappings',
          (payload && payload.shouldReloadMappings) || false
        );
    }
    case MAPPING_WIZARD_EXITED:
      return state.set('mappingWizardVisible', false);
    case SHOW_PLAN_WIZARD: {
      const { payload } = action;
      return Immutable.merge(state, {
        planWizardVisible: true,
        hidePlanWizard: false,
        planWizardId: (payload && payload.id) || null
      });
    }
    case HIDE_PLAN_WIZARD:
      return state.set('hidePlanWizard', true).set('planWizardId', null);
    case PLAN_WIZARD_EXITED:
      return state.set('planWizardVisible', false);
    case `${FETCH_PROVIDERS}_PENDING`:
      return state.set('isFetchingProviders', true);
    case `${FETCH_PROVIDERS}_FULFILLED`:
      return (() => {
        const insufficient = state
          .set('hasSufficientProviders', false)
          .set('isFetchingProviders', false)
          .set('isRejectedProviders', false);
        if (!action.payload.data || !action.payload.data.resources) {
          return insufficient;
        }
        const providers = action.payload.data.resources;
        // Providers are sufficient if Vmware and Redhat providers are both present.
        const sufficient =
          providers.some(
            p => p.type === 'ManageIQ::Providers::Vmware::InfraManager'
          ) &&
          providers.some(
            p => p.type === 'ManageIQ::Providers::Redhat::InfraManager'
          );
        return insufficient.set('hasSufficientProviders', sufficient);
      })();
    case `${FETCH_PROVIDERS}_REJECTED`:
      return state
        .set('errorProviders', action.payload)
        .set('isFetchingProviders', false)
        .set('isRejectedProviders', true);
    case `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_PENDING`:
      return state.set('isFetchingTransformationMappings', true);
    case `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_FULFILLED`:
      if (action.payload.data && action.payload.data.resources) {
        return state
          .set('transformationMappings', action.payload.data.resources)
          .set('isRejectedTransformationMappings', false)
          .set('isFetchingTransformationMappings', false)
          .set('shouldReloadMappings', false)
          .set('isContinuingToPlan', false);
      }
      return state
        .set('transformationMappings', [])
        .set('isFetchingTransformationMappings', false)
        .set('isRejectedTransformationMappings', false);
    case `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_REJECTED`:
      return state
        .set('errorTransformationMappings', action.payload)
        .set('isRejectedTransformationMappings', true)
        .set('isFetchingTransformationMappings', false);
    case `${FETCH_V2V_TRANSFORMATION_PLANS}_PENDING`:
      return state.set('isFetchingTransformationPlans', true);
    case `${FETCH_V2V_TRANSFORMATION_PLANS}_FULFILLED`:
      return state
        .set('transformationPlans', action.payload.data.resources)
        .set('isFetchingTransformationPlans', false)
        .set('isRejectedTransformationPlans', false)
        .set('errorTransformationPlans', null);
    case `${FETCH_V2V_TRANSFORMATION_PLANS}_REJECTED`:
      return state
        .set('errorTransformationPlans', action.payload)
        .set('isRejectedTransformationPlans', true)
        .set('isFetchingTransformationPlans', false);
    case `${FETCH_V2V_ARCHIVED_TRANSFORMATION_PLANS}_PENDING`:
      return state
        .set('isFetchingArchivedTransformationPlans', 'true')
        .set('isRejectedArchivedTransformationPlans', false);
    case `${FETCH_V2V_ARCHIVED_TRANSFORMATION_PLANS}_FULFILLED`:
      return state
        .set('archivedTransformationPlans', action.payload.data.resources)
        .set('isFetchingArchivedTransformationPlans', '')
        .set('isRejectedArchivedTransformationPlans', false)
        .set('errorArchivedTransformationPlans', null);
    case `${FETCH_V2V_ARCHIVED_TRANSFORMATION_PLANS}_REJECTED`:
      return state
        .set('errorArchivedTransformationPlans', action.payload)
        .set('isRejectedArchivedTransformationPlans', true)
        .set('isFetchingArchivedTransformationPlans', '');
    case `${FETCH_V2V_ALL_REQUESTS_WITH_TASKS}_PENDING`:
      return state.set('isFetchingAllRequestsWithTasks', true);
    case `${FETCH_V2V_ALL_REQUESTS_WITH_TASKS}_FULFILLED`:
      return state
        .set('allRequestsWithTasks', action.payload.data.results)
        .set('isFetchingAllRequestsWithTasks', false)
        .set('isRejectedAllRequestsWithTasks', false)
        .set('errorAllRequestsWithTasks', null)
        .set('requestsWithTasksPreviouslyFetched', true)
        .set('planId', '')
        .set('reloadCard', false);
    case `${FETCH_V2V_ALL_REQUESTS_WITH_TASKS}_REJECTED`:
      return state
        .set('errorAllRequestsWithTasks', action.payload)
        .set('isRejectedAllRequestsWithTasks', true)
        .set('isFetchingAllRequestsWithTasks', false)
        .set('requestsWithTasksPreviouslyFetched', false);
    case `${FETCH_V2V_ALL_ARCHIVED_PLAN_REQUESTS_WITH_TASKS}_PENDING`:
      return state
        .set('isFetchingAllArchivedPlanRequestsWithTasks', true)
        .set('isRejectedAllArchivedPlanRequestsWithTasks', false);
    case `${FETCH_V2V_ALL_ARCHIVED_PLAN_REQUESTS_WITH_TASKS}_FULFILLED`:
      return state
        .set('allArchivedPlanRequestsWithTasks', action.payload.data.results)
        .set('isFetchingAllArchivedPlanRequestsWithTasks', false)
        .set('isRejectedAllArchivedPlanRequestsWithTasks', false)
        .set('errorAllArchivedPlanRequestsWithTasks', null);
    case `${FETCH_V2V_ALL_ARCHIVED_PLAN_REQUESTS_WITH_TASKS}_REJECTED`:
      return state
        .set('errorAllArchivedPlanRequestsWithTasks', action.payload)
        .set('isRejectedAllArchivedPlanRequestsWithTasks', true)
        .set('isFetchingAllArchivedPlanRequestsWithTasks', false);
    case `${V2V_FETCH_CLUSTERS}_PENDING`:
      return state.set('isFetchingClusters', true);
    case `${V2V_FETCH_CLUSTERS}_FULFILLED`:
      return state
        .set('clusters', action.payload.data.resources)
        .set('isFetchingClusters', false)
        .set('isRejectedClusters', false)
        .set('errorClusters', null);
    case `${V2V_FETCH_CLUSTERS}_REJECTED`:
      return state
        .set('errorClusters', action.payload)
        .set('isRejectedClusters', true)
        .set('isFetchingClusters', false);
    case `${FETCH_NETWORKS}_PENDING`:
      return state.set('isFetchingNetworks', true);
    case `${FETCH_NETWORKS}_FULFILLED`:
      return state
        .set('networks', action.payload.data.resources)
        .set('isFetchingNetworks', false)
        .set('isRejectedNetworks', false)
        .set('errorNetworks', null);
    case `${FETCH_NETWORKS}_REJECTED`:
      return state
        .set('errorNetworks', action.payload)
        .set('isRejectedNetworks', true)
        .set('isFetchingNetworks', false);
    case `${FETCH_DATASTORES}_PENDING`:
      return state.set('isFetchingDatastores', true);
    case `${FETCH_DATASTORES}_FULFILLED`:
      return state
        .set('datastores', action.payload.data.resources)
        .set('isFetchingDatastores', false)
        .set('isRejectedDatastores', false)
        .set('errorDatastores', null);
    case `${FETCH_DATASTORES}_REJECTED`:
      return state
        .set('errorDatastores', action.payload)
        .set('isRejectedDatastores', true)
        .set('isFetchingDatastores', false);
    case `${CREATE_V2V_TRANSFORMATION_PLAN_REQUEST}_PENDING`:
      return state.set('isCreatingTransformationPlanRequest', action.payload);
    case `${CREATE_V2V_TRANSFORMATION_PLAN_REQUEST}_FULFILLED`:
      return state
        .set('createTransformationPlanRequestResponse', action.payload.data)
        .set('isCreatingTransformationPlanRequest', null)
        .set('isRejectedCreateTranformationPlanRequest', false)
        .set('errorCreateTransformationPlanRequest', null);
    case `${CREATE_V2V_TRANSFORMATION_PLAN_REQUEST}_REJECTED`:
      return state
        .set('errorCreateTransformationPlanRequest', action.payload)
        .set('isRejectedCreateTranformationPlanRequest', true)
        .set('isCreatingTransformationPlanRequest', null);
    case CONTINUE_TO_PLAN:
      return state
        .set('isContinuingToPlan', true)
        .set('shouldReloadMappings', true)
        .set('planWizardId', action.payload.id);
    case V2V_SET_MIGRATIONS_FILTER:
      return state.set('migrationsFilter', action.payload);
    case V2V_RETRY_MIGRATION:
      return state.set('planId', action.payload).set('reloadCard', true);
    case SHOW_DELETE_CONFIRMATION_MODAL:
    case HIDE_DELETE_CONFIRMATION_MODAL:
      return state
        .set('yesToDeleteInfrastructureMapping', false)
        .set('showDeleteConfirmationModal', action.payload);
    case SET_MAPPING_TO_DELETE:
      return state.set('mappingToDelete', action.payload);
    case YES_TO_DELETE_AND_HIDE_DELETE_CONFIRMATION_MODAL:
      return state
        .set('yesToDeleteInfrastructureMapping', true)
        .set('showDeleteConfirmationModal', false);
    case `${DELETE_INFRASTRUCTURE_MAPPING}_PENDING`:
      return state
        .set('yesToDeleteInfrastructureMapping', false)
        .set('isDeletingInfrastructureMapping', action.payload);
    case `${DELETE_INFRASTRUCTURE_MAPPING}_FULFILLED`:
      return state
        .set('deleteInfrastructureMappingResponse', action.payload.data)
        .set('isDeletingInfrastructureMapping', null)
        .set('isRejectedInfrastructureMapping', false)
        .set('shouldReloadMappings', true)
        .set('errorDeleteInfrastructureMapping', null);
    case `${DELETE_INFRASTRUCTURE_MAPPING}_REJECTED`:
      return state
        .set('errorDeleteInfrastructureMapping', action.payload)
        .set('isRejectedInfrastructureMapping', true)
        .set('isDeletingInfrastructureMapping', null);
    case `${ARCHIVE_TRANSFORMATION_PLAN}_PENDING`:
      return state
        .set('isArchivingTransformationPlan', true)
        .set('isRejectedArchivingTransformationPlan', false);
    case `${ARCHIVE_TRANSFORMATION_PLAN}_FULFILLED`:
      return state
        .set('isArchivingTransformationPlan', false)
        .set('isRejectedArchivingTransformationPlan', false)
        .set('errorArchivingTransformationPlan', null);
    case `${ARCHIVE_TRANSFORMATION_PLAN}_REJECTED`:
      return state
        .set('isArchivingTransformationPlan', false)
        .set('errorArchivingTransformationPlan', action.payload)
        .set('isRejectedArchivingTransformationPlan', true);

    default:
      return state;
  }
};
