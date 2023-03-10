import { useEffect, useState } from "react";
import styled from "styled-components";
import { colors, fonts, screen } from "@/styles/styleConstants";
import { Menu2, Search } from "tabler-icons-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  //Makes header background transparent or frosted glass when user scrolls down past 10px
  const [headerTransparent, setHeaderTransparent] = useState(true);
  useEffect(() => {
    const checkScrollHeight = () => {
      const scrollY = window.pageYOffset;
      if (headerTransparent != scrollY < 10) {
        setHeaderTransparent(scrollY < 10);
      }
    };

    window.addEventListener("scroll", checkScrollHeight); // add event listener
    return () => {
      window.removeEventListener("scroll", checkScrollHeight); // clean up
    };
  }, [headerTransparent]);

  //Shows menu on click of top right button
  const [showMenu, setShowMenu] = useState(false);

  //Active route listener to show search bar on map page
  const router = useRouter();
  const [url, setURL] = useState("");
  useEffect(() => {
    setURL(router.pathname);

    const handleRouteChange = (url: string, { shallow }: any) => {
      setURL(url);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, router.pathname]);

  return (
    <>
      <UpperHeader
        isTransparent={headerTransparent && !showMenu}
        onMouseEnter={() => setHeaderTransparent(false)}
        onMouseLeave={() => {
          if (scrollY < 10 && !showMenu) setHeaderTransparent(true);
        }}
      >
        <Link
          href="/"
          onClick={() => {
            setShowMenu(false);
          }}
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/North_Florida_Ospreys_logo.svg/800px-North_Florida_Ospreys_logo.svg.png"
            alt=""
          />
        </Link>
        <SearchAndMenu>
          <SearchComponent show={url.startsWith("/map")}>
            <SearchBar />
            <Search />
          </SearchComponent>
          <MenuButton
            size="3rem"
            strokeWidth={3}
            color={colors.unfBlue}
            onClick={() => setShowMenu(!showMenu)}
          />
        </SearchAndMenu>
        <Menu
          show={showMenu}
          closeMenu={() => {
            setShowMenu(false);
          }}
        />
      </UpperHeader>
    </>
  );
}

const SearchBar = styled.input`
  background-color: transparent;
  border: none;

  @media (max-width: ${screen.mobile}) {
    width: 5rem;
  }
`;

const SearchComponent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  border-radius: 3rem;
  border: 2px solid #0005;

  padding: 0 0.5rem;

  display: ${(props: { show: boolean }) => (props.show ? "flex" : "none")};
`;

const SearchAndMenu = styled.div`
  display: flex;
  align-items: center;
`;

function Menu({ show, closeMenu }: { show: boolean; closeMenu: () => void }) {
  return (
    <>
      <MenuWrapper show={show}>
        <NavButton href="/calendar" onClick={closeMenu}>
          <NavText>Calendar</NavText>
        </NavButton>
        <NavButton href="/map" onClick={closeMenu}>
          <NavText>Map</NavText>
        </NavButton>
        <NavButton href="/notecards" onClick={closeMenu}>
          <NavText>Notecards</NavText>
        </NavButton>
      </MenuWrapper>
    </>
  );
}

const NavButton = styled(Link)`
  text-decoration: none;
`;

const NavText = styled.div`
  margin: 1rem;
  padding: 0.5rem;

  color: ${colors.nearBlack};

  font-size: 2rem;
  font-weight: 600;
  font-family: ${fonts.sansSerifMain};
`;

const MenuWrapper = styled.div`
  position: fixed;
  top: ${(props: { show: boolean }) => (props.show ? "5rem" : "10rem")};
  left: 0;
  z-index: 99;

  padding: 1rem;

  width: 100vw;
  height: calc(100vh - 5rem);

  background-color: ${(props: { show: boolean }) =>
    props.show ? "#eee" : "#0000"};

  transition: ${(props: { show: boolean }) =>
    props.show
      ? "0.3s ease all, 0.8s ease backdrop-filter"
      : "0.3s ease all, 0.2s ease backdrop-filter"};

  opacity: ${(props: { show: boolean }) => (props.show ? "1" : "0")};
  visibility: ${(props: { show: boolean }) =>
    props.show ? "visible" : "hidden"};
`;

const MenuButton = styled(Menu2)`
  padding: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 90px;
`;

const UpperHeader = styled.header<{ isTransparent: boolean }>`
  position: fixed;
  z-index: 99;

  height: 5rem;
  width: 100%;
  box-sizing: border-box;
  padding: 0rem 1rem;

  color: ${colors.nearBlack};

  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: 0.3s ease all;

  backdrop-filter: ${(props: { isTransparent: boolean }) =>
    props.isTransparent ? "none" : "blur(3px)"};

  background-color: ${(props: { isTransparent: boolean }) =>
    props.isTransparent ? "transparent" : colors.translucentNearWhite};

  box-shadow: ${(props: { isTransparent: boolean }) =>
    props.isTransparent ? "none" : "0 1px 12px rgba(0, 0, 0, 0.25)"};

  border-bottom: ${(props: { isTransparent: boolean }) =>
    props.isTransparent
      ? "1px solid transparent"
      : "1px solid rgba(255, 255, 255, 0.3)"};

  a {
    color: ${colors.nearBlack};
    text-decoration: none;
    font-size: 2.25rem;
    font-weight: 600;

    display: flex;
    align-items: center;
  }
`;
