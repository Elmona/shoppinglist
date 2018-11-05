import styled from 'styled-components'

const StyledP = styled.p`
  position: relative;
  :: after {
    background: linear-gradient(to right, rgba(225, 80, 80, 0.6), rgba(225, 80, 80, 0.8), rgba(200, 200, 200, 0.4));
    border-radius: 45%;
    content: " ";
    height: 4px;
    position: absolute;
    left: -10px;
    right: 50px;
    top: 47.5%;
  }
`
export default StyledP
