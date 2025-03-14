import React from 'react';

const ComingSoon: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.text}>Coming Soon (angelo and dylan)...</h1>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
  },
  text: {
    fontSize: '50px',
    fontWeight: 'bold',
  },
};

export default ComingSoon;
