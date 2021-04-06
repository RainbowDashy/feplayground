import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Slider from './Slider'
import styled from "styled-components"

const StyledTest = styled.div`
	background: gray;
	width: 500px;
	height: 400px;
	float: center;
	margin: auto;
`

const Test = () => {
	return (
		<StyledTest>
			<Slider hasArrows >
				<div>Hello!</div>
				<div>World!</div>
				<div>2021.4.6</div>
				<img src="https://img2.baidu.com/it/u=4239512954,2646686422&fm=26&fmt=auto&gp=0.jpg" />
				<div>child 3</div>
				<img src="https://i.picsum.photos/id/834/500/400.jpg?hmac=YtRTyA64_lRUTgJ7DbQM8t-s7kjXhsIYvykGpJA7UOk"/>
				<div>child 4</div>
			</Slider>
		</StyledTest>
	);
};

ReactDOM.render(
  <>
    <div>
      <Test />
    </div>
  </>,
  document.getElementById('root')
);

