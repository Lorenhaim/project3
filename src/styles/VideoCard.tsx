import styled from 'styled-components'

export const VideoCard = styled.div`
  width: 100%;
  border-radius: .25rem;
  justify-content: center;
  align-items: center;
  height: 15rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: .25rem;
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }
`