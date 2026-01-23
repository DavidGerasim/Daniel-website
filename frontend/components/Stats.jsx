// frontend/components/Stats.jsx
"use client";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { fetchUsersCount } from "@/services/stats.api";

const Stats = () => {
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    fetchUsersCount().then(setUsersCount).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col xl:flex-row xl:items-center gap-8 xl:gap-12">
      <div className="flex gap-4">
        <div className="text-5xl font-bold text-accent flex">
          <CountUp end={3} duration={5} delay={2} />
          <span>+</span>
        </div>
        <span>
          Years <br /> Experience
        </span>
      </div>

      <div className="flex gap-4">
        <div className="text-5xl font-bold text-accent">
          <CountUp end={usersCount} duration={2} />
        </div>
        <span>Clients</span>
      </div>
    </div>
  );
};

export default Stats;
