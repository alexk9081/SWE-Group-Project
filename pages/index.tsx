import Task from "@/components/resuseable/Task";
import { fonts, screen } from "@/styles/styleConstants";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | UNF App</title>
      </Head>
      <main>
        <Hero>
          <Link href="/map">
            <Image
              src="http://fakeimg.pl/1500x600?text=Map Placeholder&font=bebas"
              alt=""
            />
          </Link>
        </Hero>

        <MainContent>
          <div>
            <UpcomingTasks>
              <UpcomingTasksTitle>Upcoming Tasks</UpcomingTasksTitle>
              <Task date="March 10th">Commit Felony</Task>
              <Task date="March 11th">Move To New Country</Task>
              <Task date="December 12th">Get Extradited</Task>
            </UpcomingTasks>
            <Test>
              Eu deserunt commodo ex ex laboris. Pariatur est amet deserunt
              nulla aliquip laborum adipisicing qui. Cupidatat voluptate in
              officia occaecat mollit et irure aliquip Lorem proident ullamco
              ipsum pariatur duis.
            </Test>
          </div>

          <StickyBox>Test</StickyBox>
        </MainContent>
      </main>
    </>
  );
}

const Test = styled.div`
  height: 15rem;

  background-color: #ddd;

  margin-right: -20rem;
  padding: 1rem 20rem 1rem 1rem;

  @media (max-width: ${screen.tablet}) {
    margin: 0;
    padding: 1rem;
  }
`;

const StickyBox = styled.div`
  position: sticky;
  top: 6rem;

  height: 20rem;

  margin: 1rem;
  padding: 1rem;

  border: 4px solid #000;
  border-radius: 1rem;

  background-color: white;

  @media (max-width: ${screen.tablet}) {
    display: none;
  }
`;

const MainContent = styled.div`
  display: grid;

  grid-template-columns: 1fr 20rem;

  @media (max-width: ${screen.tablet}) {
    grid-template-columns: 100%;
  }
`;

const Hero = styled.div`
  height: 30vh;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const UpcomingTasks = styled.div`
  margin: 1rem;
`;

const UpcomingTasksTitle = styled.div`
  font-size: 2rem;
  font-weight: 800;
`;

