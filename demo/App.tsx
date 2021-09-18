/* eslint-disable no-console */
import React, { useState } from 'react';
import Transition, {
  ENTERED,
  ENTERING,
} from '@/index';
import './app.less';

const duration = 500;
const fadeStyles = {
  [ENTERING]: {
    opacity: 1,
  },
  [ENTERED]: {
    opacity: 1,
  },
};

const App: React.FC = () => {

  const [inProp, setInProp] = useState<boolean>(false);

  const onClick = () => {
    setInProp(!inProp);
  };

  return (
    <>
      <button onClick={onClick}>toggle</button>
      <Transition in={inProp} timeout={duration}>
        {(status: string) => {
          console.log(status);
          console.log({
            opacity: 0,
            transition: 'opacity 0.5s linear',
            ...fadeStyles[status],
          });
          return (
            <div
              style={{
                opacity: 0,
                transition: 'opacity 0.5s linear',
                ...fadeStyles[status],
              }}
            >
              I'am a fade Transition
            </div>
          )
        }}
      </Transition>
    </>
  );
};

export default App;
