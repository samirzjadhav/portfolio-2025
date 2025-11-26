import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import VisitorCounter from "../components/VisitorCounter";

export default function GitHub() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);

  // Fetch profile + repos
  useEffect(() => {
    async function load() {
      const userRes = await fetch("https://api.github.com/users/samirzjadhav");
      const repoRes = await fetch(
        "https://api.github.com/users/samirzjadhav/repos?sort=updated&per_page=10"
      );

      const profileData = await userRes.json();
      const repoData = await repoRes.json();

      setProfile(profileData);
      setRepos(repoData);
    }

    load();
  }, []);

  return (
    <>
      <div className="resume-nav-fix">
        <Navbar />
      </div>

      <VisitorCounter />

      <div
        className="min-h-screen bg-gradient-to-br from-[#07030b] via-[#0f0916] to-[#05020a] 
                      text-white px-4 sm:px-6 py-20 pt-[90px]"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold section-title mb-4 text-center"
        >
          GitHub Dashboard
        </motion.h1>

        <p className="section-sub text-center text-white/70 mb-6 sm:mb-10">
          My open-source activity, repositories, and contribution stats.
        </p>

        {/* PROFILE CARD */}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
              mt-10 p-6 sm:p-8 rounded-2xl glass backdrop-blur-2xl
              border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]
              flex flex-col md:flex-row items-center gap-6 sm:gap-8
            "
          >
            {/* Avatar */}
            <img
              src={profile.avatar_url}
              alt="GitHub Profile"
              className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 
                         rounded-full border-4 border-accent shadow-xl"
            />

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold">{profile.name}</h2>
              <p className="text-white/60">@{profile.login}</p>

              <p className="mt-3 sm:mt-4 section-sub leading-relaxed">
                {profile.bio ||
                  "Frontend Developer passionate about building clean & modern UIs."}
              </p>

              {/* Stats */}
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4 text-white/70">
                <div>📁 {profile.public_repos} Repositories</div>
                <div>👥 {profile.followers} Followers</div>
                <div>➡️ {profile.following} Following</div>
                {profile.location && <div>📍 {profile.location}</div>}
              </div>

              {/* Links */}
              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                <a
                  href={profile.html_url}
                  target="_blank"
                  className="glass px-4 py-2 rounded-lg"
                >
                  GitHub Profile
                </a>

                <a
                  href="https://samirjadhav.vercel.app"
                  target="_blank"
                  className="glass px-4 py-2 rounded-lg"
                >
                  Portfolio
                </a>

                <a
                  href="https://twitter.com/samirzjadhav"
                  target="_blank"
                  className="glass px-4 py-2 rounded-lg"
                >
                  Twitter
                </a>

                <a
                  href="https://linkedin.com/in/samirzjadhav"
                  target="_blank"
                  className="glass px-4 py-2 rounded-lg"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* CONTRIBUTIONS */}
        <div className="mt-16 glass p-6 rounded-xl border border-white/10 shadow-xl">
          <h2 className="text-accent font-semibold text-xl mb-4">
            Contribution Activity
          </h2>

          <div className="contribution-graph-wrapper">
            <img
              src="https://ghchart.rshah.org/6f5cff/samirzjadhav"
              alt="GitHub Contributions"
              className="contribution-graph"
            />
          </div>
        </div>

        {/* REPOS LIST */}
        <h2 className="text-accent font-semibold text-2xl mt-14 mb-4">
          Latest 10 Repositories
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mt-6">
          {repos.map((repo) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              className="
                glass p-6 sm:p-7 rounded-2xl border border-white/10 
                shadow-[0_8px_30px_rgba(0,0,0,0.35)]
              "
            >
              {/* TITLE */}
              <h3 className="text-lg sm:text-xl font-bold">{repo.name}</h3>

              {/* DESCRIPTION */}
              <p className="text-white/60 text-sm mt-2 leading-relaxed">
                {repo.description || "A modern open-source project by Samir."}
              </p>

              {/* STATS */}
              <div className="mt-4 flex flex-wrap gap-4 text-white/60 text-sm">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                <span>🟦 {repo.language || "N/A"}</span>
                <span>⏱ {new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>

              {/* BUTTONS */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <motion.a
                  href={repo.html_url}
                  target="_blank"
                  whileHover={{ scale: 1.06 }}
                  className="btn-accent text-sm py-2 rounded-lg text-center flex-1"
                >
                  View Repo
                </motion.a>

                {repo.homepage && (
                  <motion.a
                    href={repo.homepage}
                    target="_blank"
                    whileHover={{ scale: 1.06 }}
                    className="glass py-2 rounded-lg text-sm text-center flex-1"
                  >
                    Live Demo
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
