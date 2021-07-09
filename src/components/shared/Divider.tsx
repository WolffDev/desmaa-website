import styled from "styled-components";
import { getEmSize } from "../../styles/mixins";
import { dimensions } from "../../styles/variables";

const Divider = styled.div`
    display: flex;
    justify-content: center;
    width: ${getEmSize(dimensions.fontSize.large)}em;
    height: 1px;
    background-color: var(--onBackground);
    margin: 45px auto;
`;

export default Divider;
