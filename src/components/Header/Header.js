import Button from 'react-bootstrap/Button';

export const Header = () => { 
  return (
    <header style={{display: 'flex', position: 'fixed', top: 0 }}>
      <div>LOGO</div>
      <Button>Button</Button>
    </header>
  );
};