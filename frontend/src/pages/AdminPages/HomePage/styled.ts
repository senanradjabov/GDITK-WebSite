import styled from "styled-components";

import { HEADER_HEIGHT } from "@/consts";
import colors from "@/consts/colors";

export const Header = styled.header`
  background-color: ${colors.white};
  min-height: ${HEADER_HEIGHT};

  border-end-end-radius: 12px;
`;
