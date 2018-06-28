import API from '../../../../../../../../common/API';
import {
  POST_V2V_MIGRATION_PLANS,
  POST_V2V_MIGRATION_REQUESTS
} from './PlanWizardResultsStepConstants';

const postMigrationRequestsAction = (response, dispatch) => {
  dispatch({
    type: POST_V2V_MIGRATION_REQUESTS,
    payload: new Promise((resolve, reject) => {
      API.post(`${response.data.results[0].href}`, {
        action: 'order'
      })
        .then(responseMigrationRequest => {
          resolve(responseMigrationRequest);
        })
        .catch(e => reject(e));
    })
  });
};

const _postMigrationPlansActionCreator = (
  url,
  migrationPlans,
  planSchedule
) => dispatch =>
  dispatch({
    type: POST_V2V_MIGRATION_PLANS,
    payload: new Promise((resolve, reject) => {
      API.post(url, migrationPlans)
        .then(response => {
          resolve(response);
          if (planSchedule === 'migration_plan_now') {
            postMigrationRequestsAction(response, dispatch);
          }
        })
        .catch(e => reject(e));
    })
  });

export const postMigrationPlansAction = (url, migrationPlans, planSchedule) =>
  _postMigrationPlansActionCreator(url, migrationPlans, planSchedule);
