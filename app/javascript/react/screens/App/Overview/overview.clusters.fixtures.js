const clustersData = {
  name: 'clusters',
  count: 5,
  subcount: 5,
  pages: 1,
  resources: [
    {
      href: 'http://0.0.0.0:8080/api/clusters/4',
      id: '10000000000003',
      name: 'Default',
      ems_id: '22',
      created_on: '2017-10-25T16:33:36Z',
      updated_on: '2017-10-25T16:33:36Z',
      uid_ems: '00000002-0002-0002-0002-00000000024b',
      ha_enabled: null,
      ha_admit_control: null,
      ha_max_failures: null,
      drs_enabled: null,
      drs_automation_level: null,
      drs_migration_threshold: null,
      last_perf_capture_on: null,
      ems_ref_obj: '/api/clusters/00000002-0002-0002-0002-00000000024b',
      effective_cpu: null,
      effective_memory: null,
      ems_ref: '/api/clusters/00000002-0002-0002-0002-00000000024b',
      type: null,
      v_parent_datacenter: 'Default'
    },
    {
      href: 'http://0.0.0.0:8080/api/clusters/5',
      id: '10000000000005',
      name: 'rhevh1-Local',
      ems_id: '22',
      created_on: '2017-10-25T16:33:36Z',
      updated_on: '2017-10-25T16:33:36Z',
      uid_ems: '890213fa-2b0d-4c72-ab22-a19d6434031a',
      ha_enabled: null,
      ha_admit_control: null,
      ha_max_failures: null,
      drs_enabled: null,
      drs_automation_level: null,
      drs_migration_threshold: null,
      last_perf_capture_on: null,
      ems_ref_obj: '/api/clusters/890213fa-2b0d-4c72-ab22-a19d6434031a',
      effective_cpu: null,
      effective_memory: null,
      ems_ref: '/api/clusters/890213fa-2b0d-4c72-ab22-a19d6434031a',
      type: null,
      v_parent_datacenter: 'Datacenter'
    },
    {
      href: 'http://0.0.0.0:8080/api/clusters/6',
      id: '6',
      name: 'overcloud-Compute-gecols5lpz4o',
      ems_id: '30',
      created_on: '2017-11-16T19:24:14Z',
      updated_on: '2017-11-16T19:24:14Z',
      uid_ems: 'b29a82fd-0671-4d41-80b0-43a1534f9e8a',
      ha_enabled: null,
      ha_admit_control: null,
      ha_max_failures: null,
      drs_enabled: null,
      drs_automation_level: null,
      drs_migration_threshold: null,
      last_perf_capture_on: null,
      ems_ref_obj: null,
      effective_cpu: null,
      effective_memory: null,
      ems_ref: 'b29a82fd-0671-4d41-80b0-43a1534f9e8a',
      type: 'ManageIQ::Providers::Openstack::InfraManager::EmsCluster',
      v_parent_datacenter: ''
    },
    {
      href: 'http://0.0.0.0:8080/api/clusters/7',
      id: '7',
      name: 'overcloud-Controller-kw7lgjvt3ncf',
      ems_id: '30',
      created_on: '2017-11-16T19:24:14Z',
      updated_on: '2017-11-16T19:24:14Z',
      uid_ems: '36f49390-e62d-4823-a088-c62f9dad0429',
      ha_enabled: null,
      ha_admit_control: null,
      ha_max_failures: null,
      drs_enabled: null,
      drs_automation_level: null,
      drs_migration_threshold: null,
      last_perf_capture_on: null,
      ems_ref_obj: null,
      effective_cpu: null,
      effective_memory: null,
      ems_ref: '36f49390-e62d-4823-a088-c62f9dad0429',
      type: 'ManageIQ::Providers::Openstack::InfraManager::EmsCluster',
      v_parent_datacenter: ''
    },
    {
      href: 'http://0.0.0.0:8080/api/clusters/1',
      id: '10000000000002',
      name: 'Raleigh',
      ems_id: '1',
      created_on: '2017-10-06T16:41:09Z',
      updated_on: '2018-01-20T23:12:00Z',
      uid_ems: 'domain-c7',
      ha_enabled: false,
      ha_admit_control: true,
      ha_max_failures: 1,
      drs_enabled: false,
      drs_automation_level: 'fullyAutomated',
      drs_migration_threshold: 3,
      last_perf_capture_on: null,
      ems_ref_obj: 'domain-c7',
      effective_cpu: 109356,
      effective_memory: 790163881984,
      ems_ref: 'domain-c7',
      type: null,
      v_parent_datacenter: 'Datacenter'
    }
  ],
  actions: [
    { name: 'query', method: 'post', href: 'http://0.0.0.0:8080/api/clusters' }
  ],
  links: {
    self:
      'http://0.0.0.0:8080/api/clusters?attributes=v_parent_datacenter\u0026expand=resources\u0026offset=0',
    first:
      'http://0.0.0.0:8080/api/clusters?attributes=v_parent_datacenter\u0026expand=resources\u0026offset=0',
    last:
      'http://0.0.0.0:8080/api/clusters?attributes=v_parent_datacenter\u0026expand=resources\u0026offset=0'
  }
};

export const requestClustersData = {
  method: 'GET',
  response: { data: clustersData }
};
