import { styled } from "@codeponder/ui";
import { useCallback, useEffect, useRef, useState } from "react";

const Container = styled.div`
  & .inner-animate-box {
    max-height: 0;
    opacity: 0;
    transition: max-height 400ms, opacity 600ms ease;
  }
  &.is-open .inner-animate-box {
    max-height: 2000px;
    opacity: 1;
  }
`;

export const useAnimateOpen = (initialState: boolean = false) => {
  const ref = useRef<HTMLDivElement>(null);
  const animate = useRef(!initialState);
  const [isOpen, setIsOpen] = useState(initialState);

  const onClick = useCallback(({ target: elm }: any) => {
    elm.classList.toggle("is-open");
    if (ref.current) {
      ref.current!.classList.remove("is-open");
      // remove the component after the transition ends
      setTimeout(() => {
        setIsOpen(false);
      }, 400);
    } else {
      setIsOpen(true);
    }
  }, []);

  useEffect(
    () => {
      if (isOpen) {
        ref.current!.classList.add("is-open");
      }
      animate.current = !isOpen;
    },
    [isOpen]
  );

  const AnimateContainer: React.FC = ({ children }) =>
    isOpen ? (
      <Container ref={ref} className={animate.current ? "" : "is-open"}>
        {children}
      </Container>
    ) : null;

  return { AnimateContainer, isOpen, onClick };
};
