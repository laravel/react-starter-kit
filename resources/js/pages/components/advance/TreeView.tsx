import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// third-party
import TreeView, { flattenTree, NodeId } from 'react-accessible-treeview';

// project-imports
import MainCard from '@/components/MainCard';
import ReferenceHeader from '@/components/ReferenceHeader';

const folder = {
  name: '',
  children: [
    {
      name: 'Label A',
      children: [{ name: 'Label A.A', children: [{ name: 'Label A.A.A' }, { name: 'Label A.A.B' }] }]
    },
    {
      name: 'Label B',
      children: [{ name: 'Label B.A' }]
    }
  ]
};

// =============================|| ADVANCED - TREE VIEW ||============================== //

export default function AdvanceTreeViewPage() {
  const data = flattenTree(folder);

  const defaultExpandedNode = data.find((node) => node.name === 'Label A');
  const [expandedId, setExpandedId] = useState<NodeId | null>(defaultExpandedNode?.id ?? null);
  const [selected, setSelected] = useState<number | null>(null);

  const handleExpand = (nodeId: number) => {
    setExpandedId((prev) => (prev === nodeId ? null : nodeId));
  };

  return (
    <>
      <AppLayout>
        <Head title="Tree view" />
        <ReferenceHeader caption="Standalone tree view library" link="https://www.npmjs.com/package/react-accessible-treeview" />
        <MainCard title="HTML Demo">
          <TreeView
            data={data}
            expandedIds={expandedId !== null ? [expandedId] : []}
            aria-label="html-demo"
            nodeRenderer={({ element, isBranch, isExpanded, getNodeProps }) => {
              return (
                <div
                  {...getNodeProps({
                    onClick: () => {
                      handleExpand(Number(element.id));
                      setSelected(Number(element.id));
                    }
                  })}
                >
                  {isBranch && <i className={`ti ${isExpanded ? 'ti-caret-down' : 'ti-caret-right'} arrow--open`} />}
                  <span className="name">{element.name}</span>
                </div>
              );
            }}
          />
          {expandedId !== null && typeof expandedId === 'number' && <p>{data[expandedId]?.name}</p>}{' '}
          {selected !== null && expandedId !== selected && <p>Selected: {data[selected]?.name}</p>}
        </MainCard>
      </AppLayout>
    </>
  );
}
