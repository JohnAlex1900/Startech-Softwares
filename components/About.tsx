import React from "react";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-white dark:bg-slate-800/50 fade-in-section"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            About Startech Softwares
          </h2>

          <div className="h-1 w-20 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            We are a passionate team of developers, designers, and innovators
            specializing in a wide array of digital solutions. From dynamic{" "}
            <span className="font-semibold text-primary-500 dark:text-primary-400">
              Web Development
            </span>{" "}
            and intuitive{" "}
            <span className="font-semibold text-primary-500 dark:text-primary-400">
              Mobile Apps
            </span>
            , to elegant{" "}
            <span className="font-semibold text-primary-500 dark:text-primary-400">
              UI/UX Design
            </span>{" "}
            and cutting-edge{" "}
            <span className="font-semibold text-primary-500 dark:text-primary-400">
              AI Prompt Engineering
            </span>
            . Our core philosophy revolves around creating clean, scalable, and
            user-centered products that not only meet but exceed expectations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
