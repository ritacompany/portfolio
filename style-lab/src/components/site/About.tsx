// About, Hero master 6109:21873, with the copy from the 14 Nov coded homepage (branch
// claude/relaxed-ride-5mlbdu, site/index.html). Figma's text layer holds an older draft of the story
// ("I have have an eye", "I love my cats , unexpected things"), so the coded copy stays.
export function About() {
  return (
    <section className="about" id="about" aria-label="About" data-section="about">
      <div className="about__row about-story layout-grid">
        <h2 className="about__label layout-col-1 layout-span-3">About</h2>
        <div className="about__body layout-col-7 layout-span-6">
          <p>
            I studied psychology before design, and one of the things that stuck was that a cause and an effect are
            never a fixed pair. Whether two variables stay connected, flip or quietly stop mattering changes depending
            on what else is in the room. I have an eye for what’s quietly moving the needle and a proclivity for
            recognizing patterns.
          </p>
          <p>
            I believe that now more than ever, product design requires the ability to always be two steps ahead. I
            design with systematic, future-focused intentionality. Building proactive, AI-scaleable solutions for the
            modern landscape.
          </p>
          <p>
            I love my cats, drag, unexpected experiences, good letter spacing and collaborative ideation. I’m a verbal
            processor and value the importance of making space for all different types of thinkers. With everything
            that’s going on in the world, I think it’s really just all about creating spaces where we can all thrive.
            Maybe we’ll even get to thrive together.
          </p>
        </div>
      </div>
      <div className="about__row about-role layout-grid">
        <div className="layout-col-1 layout-span-3">
          <h2 className="about__label">Current role</h2>
          <p className="about__when">2024 - current</p>
        </div>
        <p className="about__body layout-col-7 layout-span-6">
          Founding designer at Mondai, a tech career tool that the industry forgot to map. Two years, one of four people
          deciding what it becomes. I met the founder when he was my mentor. I still consider him a mentor, now I'm just
          one of the voices in the room that he “argues” with.
        </p>
      </div>
    </section>
  );
}
