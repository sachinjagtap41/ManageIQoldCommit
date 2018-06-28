import Immutable from 'seamless-immutable';

export const transformationPlans = Immutable({
  name: 'service_templates',
  count: 26,
  subcount: 8,
  subquery_count: 8,
  pages: 1,
  resources: [
    // PLAN A-0 QUEUED / NOT STARTED
    {
      href: 'http://localhost:3000/api/service_templates/10',
      name: 'Migration Plan A-0',
      options: {
        config_info: {
          transformation_mapping_id: '1',
          vm_ids: ['1', '3']
        }
      },
      created_at: '2018-05-01T12:15:00Z',
      id: '10',
      miq_requests: []
    },
    // PLAN B-0 APPROVED
    // |-- Request 1: pending
    {
      href: 'http://localhost:3000/api/service_templates/20',
      name: 'Migration Plan B-0',
      options: {
        config_info: {
          transformation_mapping_id: '1',
          vm_ids: ['1', '3']
        }
      },
      miq_requests: [
        {
          href: 'http://localhost:3000/api/service_requests/2000',
          id: '2000',
          description: 'Migration Plan B-0',
          approval_state: 'pending_approval',
          type: 'ServiceTemplateTransformationPlanRequest',
          created_on: '2018-04-06T12:31:30Z',
          updated_on: '2018-04-06T12:31:30Z',
          fulfilled_on: null,
          requester_id: '1',
          requester_name: 'Administrator',
          request_type: 'transformation_plan',
          request_state: 'pending',
          message: 'VM Transformations - Request Created',
          status: 'Ok',
          options: {
            dialog: null,
            workflow_settings: {
              resource_action_id: '4508'
            },
            initiator: null,
            src_id: '6',
            cart_state: 'ordered',
            requester_group: 'EvmGroup-super_administrator'
          },
          userid: 'admin',
          source_id: '20',
          source_type: 'ServiceTemplate',
          destination_id: null,
          destination_type: null,
          tenant_id: '1',
          service_order_id: '92',
          process: true
        }
      ]
    },
    // PLAN C-0 APPROVED
    // |-- Request 1: failed
    // |-- Request 2: active
    {
      href: 'http://localhost:3000/api/service_templates/30',
      name: 'Migration Plan C-0',
      options: {
        config_info: {
          transformation_mapping_id: '1',
          vm_ids: ['1', '3']
        }
      },
      created_at: '2018-05-01T12:13:50Z',
      id: '30',
      miq_requests: [
        {
          href: 'http://localhost:3000/api/service_requests/3000',
          id: '3000',
          description: 'Migration Plan C-0',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          created_on: '2018-04-06T12:31:30Z',
          updated_on: '2018-04-06T12:31:30Z',
          fulfilled_on: '2018-04-06T12:31:30Z',
          requester_id: '1',
          requester_name: 'Administrator',
          request_type: 'transformation_plan',
          request_state: 'finished',
          message: 'VM Transformations failed',
          status: 'Error',
          options: {
            dialog: null,
            workflow_settings: {
              resource_action_id: '4351'
            },
            initiator: null,
            src_id: '30',
            cart_state: 'ordered',
            requester_group: 'EvmGroup-super_administrator',
            delivered_on: '2018-04-06T12:49:30Z'
          },
          userid: 'admin',
          source_id: '30',
          source_type: 'ServiceTemplate',
          destination_id: null,
          destination_type: null,
          tenant_id: '1',
          service_order_id: '91',
          process: true
        },
        {
          href: 'http://localhost:3000/api/service_requests/3001',
          id: '3001',
          description: 'Migration Plan C-0',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          created_on: '2018-04-06T12:31:30Z',
          updated_on: '2018-04-06T12:31:30Z',
          fulfilled_on: '2018-04-06T12:31:30Z',
          requester_id: '1',
          requester_name: 'Administrator',
          request_type: 'transformation_plan',
          request_state: 'active',
          message: '<SOMETHING>',
          status: 'Ok',
          options: {
            dialog: null,
            workflow_settings: {
              resource_action_id: '4351'
            },
            initiator: null,
            src_id: '30',
            cart_state: 'ordered',
            requester_group: 'EvmGroup-super_administrator'
          },
          userid: 'admin',
          source_id: '30',
          source_type: 'ServiceTemplate',
          destination_id: null,
          destination_type: null,
          tenant_id: '1',
          service_order_id: '91',
          process: true
        }
      ]
    },
    // PLAN D-0 FAILED
    // |-- Request 1: failed
    {
      href: 'http://localhost:3000/api/service_templates/40',
      name: 'Migration Plan D-0',
      options: {
        config_info: {
          transformation_mapping_id: '1',
          vm_ids: ['1', '3']
        }
      },
      created_at: '2018-05-01T12:13:50',
      id: '40',
      miq_requests: [
        {
          href: 'http://localhost:3000/api/service_requests/4000',
          id: '4000',
          description: 'Migration Plan D-0',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          created_on: '2018-04-06T12:31:30Z',
          updated_on: '2018-04-06T12:31:30Z',
          fulfilled_on: '2018-04-06T12:31:30Z',
          requester_id: '1',
          requester_name: 'Administrator',
          request_type: 'transformation_plan',
          request_state: 'finished',
          message: 'VM Transformations failed',
          status: 'Error',
          options: {
            dialog: null,
            workflow_settings: {
              resource_action_id: '4507'
            },
            initiator: null,
            src_id: '40',
            cart_state: 'ordered',
            requester_group: 'EvmGroup-super_administrator',
            delivered_on: '2018-05-01T12:13:58.754'
          },
          userid: 'admin',
          source_id: '40',
          source_type: 'ServiceTemplate',
          destination_id: null,
          destination_type: null,
          tenant_id: '1',
          service_order_id: '91',
          process: true
        }
      ]
    },
    // PLAN E-0 COMPLETE
    // |-- Request 1: complete
    {
      href: 'http://localhost:3000/api/service_templates/50',
      name: 'Migration Plan E-0',
      options: {
        config_info: {
          transformation_mapping_id: '1',
          vm_ids: ['1', '3']
        }
      },
      created_at: '2018-05-01T12:13:50Z',
      id: '50',
      miq_requests: [
        {
          href: 'http://localhost:3000/api/service_requests/5000',
          id: '5000',
          description: 'Migration Plan E-0',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          created_on: '2018-04-06T12:31:30Z',
          updated_on: '2018-04-06T12:31:30Z',
          fulfilled_on: '2018-04-06T12:31:30Z',
          requester_id: '1',
          requester_name: 'Administrator',
          request_type: 'transformation_plan',
          request_state: 'finished',
          message: 'VM Transformations <SOMETHING>',
          status: 'Ok',
          options: {
            dialog: null,
            workflow_settings: {
              resource_action_id: '4507'
            },
            initiator: null,
            src_id: '50',
            cart_state: 'ordered',
            requester_group: 'EvmGroup-super_administrator',
            delivered_on: '2018-04-06T12:49:30Z'
          },
          userid: 'admin',
          source_id: '50',
          source_type: 'ServiceTemplate',
          destination_id: null,
          destination_type: null,
          tenant_id: '1',
          service_order_id: '91',
          process: true
        }
      ]
    },
    // PLAN F-0 APPROVED
    // |-- Request 1: active
    {
      href: 'http://localhost:3000/api/service_templates/60',
      name: 'Migration Plan F-0',
      options: {
        config_info: {
          transformation_mapping_id: '1',
          vm_ids: ['1', '3']
        }
      },
      created_at: '2018-05-01T12:13:50Z',
      id: '60',
      miq_requests: [
        {
          href: 'http://localhost:3000/api/service_requests/6000',
          id: '6000',
          description: 'Migration Plan F-0',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          created_on: '2018-04-06T12:31:30Z',
          updated_on: '2018-04-06T12:31:30Z',
          fulfilled_on: '2018-04-06T12:31:30Z',
          requester_id: '1',
          requester_name: 'Administrator',
          request_type: 'transformation_plan',
          request_state: 'active',
          message: 'VM Transformations <SOMETHING>',
          status: 'Ok',
          options: {
            dialog: null,
            workflow_settings: {
              resource_action_id: '2507'
            },
            initiator: null,
            src_id: '60',
            cart_state: 'ordered',
            requester_group: 'EvmGroup-super_administrator',
            delivered_on: '2018-04-06T12:49:30Z'
          },
          userid: 'admin',
          source_id: '60',
          source_type: 'ServiceTemplate',
          destination_id: null,
          destination_type: null,
          tenant_id: '1',
          service_order_id: '91',
          process: true
        }
      ]
    }
  ]
});

export const requestTransformationPlansData = {
  method: 'GET',
  fetchTransformationPlansUrl: '/api/dummyTransformationPlans',
  response: { data: transformationPlans }
};
