import React from 'react';
import PropTypes from 'prop-types';
import { noop, Spinner } from 'patternfly-react';

class PlanWizardResultsStep extends React.Component {
  componentDidMount() {
    const {
      postPlansUrl,
      postMigrationPlansAction,
      plansBody,
      planSchedule
    } = this.props;

    postMigrationPlansAction(postPlansUrl, plansBody, planSchedule);
  }
  renderResult = (
    migrationPlanMessage,
    migrationPlanFollowupMessage,
    migrationPlanIcon
  ) => (
    <div className="wizard-pf-complete blank-slate-pf">
      <div className="plan-wizard-results-step-icon">
        <span className={migrationPlanIcon} />
      </div>
      <h3
        className="blank-slate-pf-main-action"
        id="migration-plan-results-message"
      >
        {migrationPlanMessage}
      </h3>
      <p className="blank-slate-pf-secondary-action">
        {migrationPlanFollowupMessage}
      </p>
    </div>
  );

  render() {
    const {
      isPostingPlans,
      isRejectedPostingPlans,
      migrationPlansResult,
      migrationRequestsResult,
      errorPostingPlans, // eslint-disable-line no-unused-vars
      plansBody,
      planSchedule
    } = this.props;

    if (isPostingPlans) {
      return (
        <div className="wizard-pf-process blank-slate-pf">
          <Spinner loading size="lg" className="blank-slate-pf-icon" />
          <h3 className="blank-slate-pf-main-action">
            {__('Creating Migration Plans...')}
          </h3>
          <p className="blank-slate-pf-secondary-action">
            {__('Please wait while infrastructure mapping is created.')}
          </p>
        </div>
      );
    } else if (isRejectedPostingPlans) {
      return (
        <div className="wizard-pf-complete blank-slate-pf">
          <div className="wizard-pf-success-icon">
            <span className="pficon pficon-error-circle-o" />
          </div>
          <h3 className="blank-slate-pf-main-action">
            {__('Error Creating Migration Plans')}
          </h3>
          <p className="blank-slate-pf-secondary-action">
            {__("We're sorry, something went wrong. Please try again.")}
          </p>
          <button type="button" className="btn btn-lg btn-primary">
            {__('Retry')}
          </button>
        </div>
      );
    } else if (
      planSchedule === 'migration_plan_later' &&
      migrationPlansResult
    ) {
      const migrationPlanSaved = sprintf(
        __(" Migration Plan: '%s' has been saved"),
        plansBody.name
      );
      const migrationPlanFollowupMessage = __(
        'Select Migrate on the Overview page to begin migration'
      );
      return this.renderResult(
        migrationPlanSaved,
        migrationPlanFollowupMessage,
        'pficon pficon-ok'
      );
    } else if (
      planSchedule === 'migration_plan_now' &&
      migrationPlansResult &&
      migrationRequestsResult
    ) {
      const migrationPlanProgress = sprintf(
        __(" Migration Plan: '%s' is in progress"),
        plansBody.name
      );
      const migrationPlanFollowupMessage = __(
        'This may take a long time. Progress of the plan will be shown in the Migration area'
      );
      return this.renderResult(
        migrationPlanProgress,
        migrationPlanFollowupMessage,
        'fa fa-clock-o'
      );
    }
    return null;
  }
}
PlanWizardResultsStep.propTypes = {
  postPlansUrl: PropTypes.string,
  postMigrationPlansAction: PropTypes.func,
  plansBody: PropTypes.object,
  planSchedule: PropTypes.string,
  isPostingPlans: PropTypes.bool,
  isRejectedPostingPlans: PropTypes.bool,
  errorPostingPlans: PropTypes.object,
  migrationPlansResult: PropTypes.object,
  migrationRequestsResult: PropTypes.object
};
PlanWizardResultsStep.defaultProps = {
  postPlansUrl: '',
  postMigrationPlansAction: noop,
  plansBody: {},
  planSchedule: '',
  isPostingPlans: true,
  isRejectedPostingPlans: false,
  errorPostingPlans: null,
  migrationPlansResult: null,
  migrationRequestsResult: null
};
export default PlanWizardResultsStep;
