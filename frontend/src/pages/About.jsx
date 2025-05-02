import React from "react";
import { useAuth } from "../context/AuthProvider";

function About() {
  const { profile } = useAuth();
  console.log(profile);
  return (
    <div className="container mx-auto my-12 p-4 space-y-9">
      <h1 className="text-2xl font-bold mb-6">About</h1>
      <p>
        This is{" "}
        <strong className="text-blue-800 font-semibold hover:scale-105 duration-500">
          {profile?.user?.name}
        </strong>{" "}
        a proficient full stack developer with a robust skill set spanning both
        front-end and back-end technologies. With a passion for building
        dynamic, responsive, and user-friendly web applications, excels in
        crafting seamless digital experiences.
      </p>
      <h2 className="font-semibold text-blue-800 text-xl">
        Technical Expertise:
      </h2>
      <p>
        Front-End: Adept in modern JavaScript frameworks and libraries such as
        React.js. Skilled in HTML5, CSS3, and responsive
        design principles to create intuitive and visually appealing interfaces.
        Back-End: Proficient in server-side technologies including Node.js,
        Express.js. Experienced with database management using SQL
        MongoDB.
        Knowledgeable in containerization and orchestration tools such as Figma for the UI interfaces designing
        . Cloud Services: Experience with cloud platforms like
        AWS, Azure, and Google Cloud, enabling scalable and reliable application
        deployment.
      </p>
      <h2 className="font-semibold text-blue-800 text-xl">
        Professional Highlights:
      </h2>
      <p>
        Successfully developed and deployed full-stack applications and frontend applications,
        demonstrating strong problem-solving skills and a keen eye for detail.
        Collaborated with cross-functional teams to deliver high-quality
        software solutions within tight deadlines. Continuously learning and
        adapting to emerging technologies and industry trends to stay ahead in
        the fast-evolving tech landscape.
      </p>
      <br />
      <span>
        Ananya K.J is dedicated to leveraging her expertise to contribute to
        innovative projects and drive technological advancements. Whether
        working on front-end interfaces or back-end logic, she is passionate
        about delivering exceptional digital solutions that meet user needs and
        exceed client expectations.
      </span>
      <h2 className="font-semibold text-blue-800 text-xl">
        Personal Interests and Inspiration:
      </h2>
      <p>
      Beyond her professional achievements, Ananya K.J. is a big fan of anime and cherishes her hobby of reading novels. 
      Her favorite show is <strong>Attack On Titan</strong> (AOT). She loves AOT for its <strong>complex storytelling</strong>,
       <strong>mature themes</strong>, and <strong>political perspectives</strong>. The anime masterfully explores the intricacies of human nature and 
       moral dilemmas, providing multiple viewpoints from its diverse characters. This depth creates a rich world that keeps viewers on the edge of their seats,
        making it a truly unforgettable experience! 🌟📖
      </p>
    </div>
  );
}

export default About;
