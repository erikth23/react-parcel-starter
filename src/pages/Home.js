import React from 'react';

const Home = () => {

  console.log('hello')

  return(
    <React.Fragment>
      <div className='d-flex flex-column justify-content-center align-items-center' style={{
          height: '100%',
          width: '100%'
        }}>
        <h1 className='display-2'>INFO 474 Homepage</h1>
        <h2 className='display-5'>Erik Thomas-Hommer</h2>
        <div style={{'text-align': 'center', width: '60%'}}>
          <p>This webpage is intended to be a way for me to keep all of my assignments in one organized space.  You can click through the tabs up top to view the work that I have done.</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
