const Attribute = ({ caption, attribute }) => {
  const attributeStatus = () => {
    if (
      !JSON.parse(JSON.stringify(attribute)) ||
      JSON.parse(JSON.stringify(attribute)) === 'None'
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className='attributes-css'>
      <div className={attributeStatus() ? 'green' : 'red'}>
        {attributeStatus() ? '✓' : '✗'}
      </div>
      <div>{caption}</div>
    </div>
  );
};

export default Attribute;
