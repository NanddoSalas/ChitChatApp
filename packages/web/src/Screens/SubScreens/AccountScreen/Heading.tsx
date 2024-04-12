import Breadcrumb from '../../../componentes/Breadcrumbs';

export default function Heading() {
  return (
    <div className="border-b border-gray-300 pb-5 sm:flex sm:items-center sm:justify-between">
      <Breadcrumb items={[{ name: 'Account', path: null }]} />
    </div>
  );
}
