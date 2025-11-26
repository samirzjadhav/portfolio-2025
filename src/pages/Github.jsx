import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-[#07030b] via-[#0f0916] to-[#05020a] text-white py-20 px-6">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold section-title mb-5"
      >
        GitHub Dashboard
      </motion.h1>

      <p className="section-sub mt-2 text-white/70">
        My open-source activity, repositories, and contribution stats.
      </p>

      {/* PROFILE CARD */}
      {profile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            mt-12 p-8 rounded-2xl glass backdrop-blur-2xl
            border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]
            flex flex-col md:flex-row gap-8 items-center
          "
        >
          {/* Profile Image */}
          <img
            src={profile.avatar_url}
            alt="GitHub Profile"
            className="w-56 h-56 rounded-full border-4 border-accent shadow-xl"
          />

          {/* Profile Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold">{profile.name}</h2>
            <p className="text-white/60">@{profile.login}</p>

            <p className="mt-4 section-sub leading-relaxed max-w-2xl">
              {profile.bio ||
                "Frontend Developer passionate about building clean & modern UIs."}
            </p>

            {/* Stats */}
            <div className="mt-5 flex flex-wrap gap-6 text-white/70">
              <div>📁 {profile.public_repos} Repositories</div>
              <div>👥 {profile.followers} Followers</div>
              <div>➡️ {profile.following} Following</div>
              {profile.location && <div>📍 {profile.location}</div>}
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <a
                href={profile.html_url}
                className="glass px-4 py-2 rounded-lg hover:bg-white/10 transition"
                target="_blank"
              >
                GitHub Profile
              </a>

              <a
                href="https://samirjadhav.vercel.app"
                className="glass px-4 py-2 rounded-lg hover:bg-white/10 transition"
                target="_blank"
              >
                Portfolio
              </a>

              <a
                href="https://twitter.com/samirzjadhav"
                className="glass px-4 py-2 rounded-lg hover:bg-white/10 transition"
                target="_blank"
              >
                Twitter
              </a>

              <a
                href="https://linkedin.com/in/samirzjadhav"
                className="glass px-4 py-2 rounded-lg hover:bg-white/10 transition"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* CONTRIBUTION GRAPH */}
      <div
        className="
          mt-16 glass p-6 rounded-xl backdrop-blur-xl 
          border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]
        "
      >
        <h2 className="text-accent font-semibold text-xl mb-4">
          Contribution Activity
        </h2>

        <img
          src="https://ghchart.rshah.org/6f5cff/samirzjadhav"
          alt="GitHub Contributions"
          className="w-full"
        />
      </div>

      {/* LATEST 10 REPOSITORIES */}
      <h2 className="text-accent font-semibold text-2xl mt-14 mb-4">
        Latest 10 Repositories
      </h2>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        {repos.map((repo) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, translateY: -4 }}
            transition={{ duration: 0.4 }}
            className="
        glass p-7 rounded-2xl 
        border border-white/10
        backdrop-blur-xl
        shadow-[0_8px_30px_rgba(0,0,0,0.35)]
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]
        transition
      "
          >
            {/* TITLE */}
            <h3 className="text-xl font-bold tracking-wide">{repo.name}</h3>

            {/* DESCRIPTION */}
            <p className="text-white/60 text-sm mt-2 leading-relaxed">
              {repo.description || "A modern open-source project by Samir."}
            </p>

            {/* STATS */}
            <div className="mt-4 flex flex-wrap gap-5 text-white/60 text-sm">
              <span className="flex items-center gap-1">
                ⭐ {repo.stargazers_count}
              </span>

              <span className="flex items-center gap-1">
                🍴 {repo.forks_count}
              </span>

              <span className="flex items-center gap-1">
                🟦 {repo.language || "N/A"}
              </span>

              <span className="flex items-center gap-1">
                ⏱ {new Date(repo.updated_at).toLocaleDateString()}
              </span>
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex gap-4">
              <motion.a
                href={repo.html_url}
                target="_blank"
                whileHover={{ scale: 1.06 }}
                className="
            btn-accent text-sm py-2 px-4 rounded-lg 
            flex-1 text-center
          "
              >
                View Repo
              </motion.a>

              {repo.homepage && (
                <motion.a
                  href={repo.homepage}
                  target="_blank"
                  whileHover={{ scale: 1.06 }}
                  className="
              glass px-4 py-2 rounded-lg text-sm flex-1 text-center
            "
                >
                  Live Demo
                </motion.a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
