import { Button, message } from 'antd';
import './Buttons.css';

const Buttons = () => {
  const showAntdButtonMessage = () => message.info('You clicked on an antd button!');

  const showNativeButtonMessage = () => message.info('You clicked on a native button!');

  return (
    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      <button onClick={showNativeButtonMessage} type="button">
        Button 1
      </button>
      <button onClick={showNativeButtonMessage} type="button">
        Button 2
      </button>
      <button onClick={showNativeButtonMessage} type="button">
        Button 3
      </button>
      <Button onClick={showAntdButtonMessage} type="primary">
        Button 4
      </Button>
      <Button onClick={showAntdButtonMessage} type="primary">
        Button 5
      </Button>
      <Button onClick={showAntdButtonMessage} type="primary">
        Button 6
      </Button>
    </div>
  );
};

export default Buttons;
