import Breadcrumb from '../../../componentes/Breadcrumbs';

export default function Heading() {
  return (
    <div className="border-b border-gray-300 pb-5 flex items-center justify-between">
      <Breadcrumb items={[{ name: 'Account', path: null }]} />
    </div>
  );
}
