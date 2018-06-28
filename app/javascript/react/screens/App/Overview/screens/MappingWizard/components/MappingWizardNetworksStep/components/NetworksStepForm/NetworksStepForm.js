import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import DualPaneMapper from '../../../DualPaneMapper/DualPaneMapper';
import DualPaneMapperList from '../../../DualPaneMapper/DualPaneMapperList';
import DualPaneMapperCount from '../../../DualPaneMapper/DualPaneMapperCount';
import DualPaneMapperListItem from '../../../DualPaneMapper/DualPaneMapperListItem';
import MappingWizardTreeView from '../../../MappingWizardTreeView/MappingWizardTreeView';

import {
  sourceNetworksFilter,
  clustersMappingWithTreeViewAttrs,
  targetNetworkWithTreeViewAttrs,
  networkGroupingForRep,
  mappingsForTreeView,
  mappingWithTargetNetworkRemoved,
  mappingWithSourceNetworkRemoved,
  getRepresentatives
} from './helpers';

class NetworksStepForm extends React.Component {
  state = {
    selectedSourceNetworks: [],
    selectedTargetNetwork: null,
    selectedNode: null
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.selectedCluster &&
      nextProps.selectedCluster.id !== this.props.selectedCluster.id
    ) {
      this.setState(() => ({
        selectedSourceNetworks: [],
        selectedTargetNetwork: null
      }));
    }
  }

  selectSourceNetwork = sourceNetwork => {
    this.setState(prevState => {
      const isAlreadySelected = prevState.selectedSourceNetworks.some(
        selectedSourceNetwork =>
          selectedSourceNetwork.uid_ems === sourceNetwork.uid_ems
      );
      if (isAlreadySelected) {
        return {
          selectedSourceNetworks: prevState.selectedSourceNetworks.filter(
            selectedSourceNetwork =>
              selectedSourceNetwork.uid_ems !== sourceNetwork.uid_ems
          )
        };
      }
      return {
        selectedSourceNetworks: [
          ...prevState.selectedSourceNetworks,
          sourceNetwork
        ]
      };
    });
  };

  selectTargetNetwork = targetNetwork => {
    this.setState(() => ({ selectedTargetNetwork: targetNetwork }));
  };

  addNetworkMapping = () => {
    const {
      input: { value: networksStepMappings, onChange },
      selectedCluster,
      selectedClusterMapping,
      groupedSourceNetworks
    } = this.props;

    const { selectedTargetNetwork, selectedSourceNetworks } = this.state;

    const noMappingForTargetCluster = !networksStepMappings.some(
      targetClusterWithNetworkMappings =>
        targetClusterWithNetworkMappings.id === selectedClusterMapping.id
    );

    const addingToExistingMapping = networksStepMappings.some(
      targetClusterWithNetworkMappings =>
        targetClusterWithNetworkMappings.nodes.some(
          networkMapping => networkMapping.id === selectedTargetNetwork.id
        )
    );

    if (networksStepMappings.length === 0 || noMappingForTargetCluster) {
      // ADD A NETWORKS STEP MAPPING
      //   targetCluster
      //   -- selectedTargetNetwork
      //   ----  [...network groupings for selected source networks]
      const networksStepMappingToAdd = {
        ...clustersMappingWithTreeViewAttrs(selectedClusterMapping),
        nodes: [
          {
            ...targetNetworkWithTreeViewAttrs(selectedTargetNetwork),
            nodes: selectedSourceNetworks.reduce(
              (sourceNetworks, sourceNetworkGroupRep) => [
                ...sourceNetworks,
                ...networkGroupingForRep(
                  sourceNetworkGroupRep,
                  groupedSourceNetworks,
                  selectedCluster
                )
              ],
              []
            )
          }
        ]
      };
      onChange([...networksStepMappings, networksStepMappingToAdd]);
    } else {
      const updatedNetworksStepMappings = networksStepMappings.map(
        targetClusterWithNetworkMappings => {
          if (
            targetClusterWithNetworkMappings.id !== selectedClusterMapping.id
          ) {
            return targetClusterWithNetworkMappings;
          } else if (addingToExistingMapping) {
            // ADD TO EXISTING NETWORKS MAPPING
            //   matchingTargetCluster
            //   -- selectedTargetNetwork
            //   ---- [...alreadyMappedSourceNetworks, ...network groupings for selected source networks]
            return {
              ...targetClusterWithNetworkMappings,
              nodes: targetClusterWithNetworkMappings.nodes.map(
                networkMapping => {
                  if (networkMapping.id === selectedTargetNetwork.id) {
                    return {
                      ...networkMapping,
                      nodes: [
                        ...networkMapping.nodes,
                        ...selectedSourceNetworks.reduce(
                          (sourceNetworks, networkGroupRep) => [
                            ...sourceNetworks,
                            ...networkGroupingForRep(
                              networkGroupRep,
                              groupedSourceNetworks,
                              selectedCluster
                            )
                          ],
                          []
                        )
                      ]
                    };
                  }
                  return networkMapping;
                }
              )
            };
          }
          // ADD TO EXISTING NETWORKS STEP MAPPING
          //   matchingTargetCluster
          //   -- existingNetworkMapping(s)
          //   -- selectedTargetNetwork
          //   ---- [...network groupings for selected source networks]
          return {
            ...targetClusterWithNetworkMappings,
            nodes: [
              ...targetClusterWithNetworkMappings.nodes,
              {
                ...targetNetworkWithTreeViewAttrs(selectedTargetNetwork),
                nodes: selectedSourceNetworks.reduce(
                  (sourceNetworks, networkGroupRep) => [
                    ...sourceNetworks,
                    ...networkGroupingForRep(
                      networkGroupRep,
                      groupedSourceNetworks,
                      selectedCluster
                    )
                  ],
                  []
                )
              }
            ]
          };
        }
      );
      onChange(updatedNetworksStepMappings);
    }

    this.setState(prevState => ({
      selectedTargetNetwork: null,
      selectedSourceNetworks: []
    }));
  };

  selectNode = selectedNode => {
    const { value: networksStepMappings, onChange } = this.props.input;
    const isTargetNetwork = selectedNode.nodes;

    if (isTargetNetwork) {
      const updatedMappings = networksStepMappings.map(
        targetClusterWithNetworksMappings => {
          const {
            nodes: networksMappings,
            ...targetCluster
          } = targetClusterWithNetworksMappings;
          return {
            ...targetCluster,
            nodes: networksMappings.map(networksMapping => {
              const {
                nodes: sourceNetworks,
                ...targetNetwork
              } = networksMapping;
              return targetNetwork.id === selectedNode.id
                ? {
                    ...targetNetwork,
                    selected: !targetNetwork.selected,
                    nodes: sourceNetworks.map(sourceNetwork => ({
                      ...sourceNetwork,
                      selected: false
                    }))
                  }
                : {
                    ...targetNetwork,
                    selected: false,
                    nodes: sourceNetworks.map(sourceNetwork => ({
                      ...sourceNetwork,
                      selected: false
                    }))
                  };
            })
          };
        }
      );
      onChange(updatedMappings);
    } else {
      const updatedMappings = networksStepMappings.map(
        targetClusterWithNetworksMappings => {
          const {
            nodes: networksMappings,
            ...targetCluster
          } = targetClusterWithNetworksMappings;
          return {
            ...targetCluster,
            nodes: networksMappings.map(networksMapping => {
              const {
                nodes: sourceNetworks,
                ...targetNetwork
              } = networksMapping;
              return {
                ...targetNetwork,
                selected: false,
                nodes: sourceNetworks.map(sourceNetwork => {
                  if (sourceNetwork.uid_ems === selectedNode.uid_ems) {
                    return {
                      ...sourceNetwork,
                      selected: !sourceNetwork.selected
                    };
                  } else if (sourceNetwork.selected) {
                    return {
                      ...sourceNetwork,
                      selected: false
                    };
                  }
                  return sourceNetwork;
                })
              };
            })
          };
        }
      );
      onChange(updatedMappings);
    }
    this.setState(() => ({ selectedNode }));
  };

  removeNode = () => {
    const { value: networksStepMappings, onChange } = this.props.input;
    const { selectedNode } = this.state;
    const isTargetNetwork = selectedNode.nodes;

    // *********************
    // NETWORKS STEP MAPPING
    // *********************
    // Target Cluster
    // --> Target Network
    // ----> Source network grouping(s)

    // ****************
    // NETWORKS MAPPING
    // ****************
    // Target Network
    // --> Source network grouping(s)

    const updatedMappings = isTargetNetwork
      ? networksStepMappings.reduce(
          (updatedNetworksStepMappings, networksStepMapping) => {
            const updatedMapping = mappingWithTargetNetworkRemoved(
              networksStepMapping,
              selectedNode
            );
            return updatedMapping
              ? [...updatedNetworksStepMappings, updatedMapping]
              : [...updatedNetworksStepMappings];
          },
          []
        )
      : networksStepMappings.reduce(
          (updatedNetworksStepMappings, networksStepMapping) => {
            const {
              nodes: networksMappings,
              ...targetCluster
            } = networksStepMapping;
            const updatedNodes = networksMappings.reduce(
              (updatedNetworksMappings, networksMapping) => {
                const updatedMapping = mappingWithSourceNetworkRemoved(
                  networksMapping,
                  selectedNode
                );
                return updatedMapping
                  ? [...updatedNetworksMappings, updatedMapping]
                  : [...updatedNetworksMappings];
              },
              []
            );
            return updatedNodes
              ? [
                  ...updatedNetworksStepMappings,
                  { ...targetCluster, nodes: updatedNodes }
                ]
              : [...updatedNetworksStepMappings];
          },
          []
        );

    onChange(updatedMappings);
    this.setState(() => ({ selectedNode: null }));
  };

  removeAll = () => {
    const { input } = this.props;
    input.onChange([]);
  };

  render() {
    const {
      groupedSourceNetworks,
      groupedTargetNetworks,
      isFetchingSourceNetworks,
      isFetchingTargetNetworks,
      input,
      selectedCluster
    } = this.props;
    const {
      selectedSourceNetworks,
      selectedTargetNetwork,
      selectedNode
    } = this.state;

    const classes = cx('dual-pane-mapper-form', {
      'is-hidden': !selectedCluster
    });

    const counter = (
      <DualPaneMapperCount
        selectedItems={selectedSourceNetworks.length}
        totalItems={
          sourceNetworksFilter(groupedSourceNetworks, input.value).length
        }
      />
    );

    return (
      <div className={classes}>
        <DualPaneMapper
          handleButtonClick={this.addNetworkMapping}
          validMapping={
            !(
              selectedTargetNetwork &&
              (selectedSourceNetworks && selectedSourceNetworks.length > 0)
            )
          }
        >
          <DualPaneMapperList
            id="source_networks"
            listTitle={__('Source Networks')}
            loading={isFetchingSourceNetworks}
            counter={counter}
          >
            {groupedSourceNetworks &&
              sourceNetworksFilter(groupedSourceNetworks, input.value).map(
                sourceNetwork => (
                  <DualPaneMapperListItem
                    item={sourceNetwork}
                    text={`${sourceNetwork.providerName} \\ ${
                      sourceNetwork.name
                    }`}
                    key={sourceNetwork.id}
                    selected={
                      selectedSourceNetworks &&
                      selectedSourceNetworks.some(
                        selectedSourceNetwork =>
                          selectedSourceNetwork.uid_ems ===
                          sourceNetwork.uid_ems
                      )
                    }
                    handleClick={this.selectSourceNetwork}
                    handleKeyPress={this.selectSourceNetwork}
                  />
                )
              )}
          </DualPaneMapperList>
          <DualPaneMapperList
            id="target_networks"
            listTitle={__('Target Networks')}
            loading={isFetchingTargetNetworks}
          >
            {groupedTargetNetworks &&
              getRepresentatives(groupedTargetNetworks).map(targetNetwork => (
                <DualPaneMapperListItem
                  item={targetNetwork}
                  text={`${targetNetwork.providerName} \\ ${
                    targetNetwork.name
                  }`}
                  key={targetNetwork.id}
                  selected={
                    selectedTargetNetwork &&
                    selectedTargetNetwork.uid_ems === targetNetwork.uid_ems
                  }
                  handleClick={this.selectTargetNetwork}
                  handleKeyPress={this.selectTargetNetwork}
                />
              ))}
          </DualPaneMapperList>
        </DualPaneMapper>
        <MappingWizardTreeView
          mappings={mappingsForTreeView(input.value)}
          selectNode={this.selectNode}
          removeNode={this.removeNode}
          removeAll={this.removeAll}
          selectedNode={selectedNode}
        />
      </div>
    );
  }
}

NetworksStepForm.propTypes = {
  input: PropTypes.object,
  groupedSourceNetworks: PropTypes.object,
  groupedTargetNetworks: PropTypes.object,
  isFetchingSourceNetworks: PropTypes.bool,
  isFetchingTargetNetworks: PropTypes.bool,
  selectedCluster: PropTypes.object,
  selectedClusterMapping: PropTypes.object
};

export default NetworksStepForm;
