// import YTDlpWrap from 'yt-dlp-wrap';

// const ytDlpWrap = new YTDlpWrap.default(); // Correct constructor usage

// const PLAYLISTS = {
//     leetcode: "https://www.youtube.com/playlist?list=PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr",
//     codeforces: "https://www.youtube.com/playlist?list=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB",
//     codechef: "https://www.youtube.com/playlist?list=PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr",
// };

// const fetchVideoLink = async (playlistUrl, contestTitle) => {
//     try {
//         const metadata = await ytDlpWrap.execPromise([
//             playlistUrl,
//             '--flat-playlist',
//             '--dump-json',
//         ]);

//         const videos = metadata
//             .trim()
//             .split("\n")
//             .map((video) => JSON.parse(video));
//         console.log("videos:", videos);

//         const matchedVideo = videos.find((video) =>
//             video.title.toLowerCase().includes(contestTitle.toLowerCase())
//         );

//         if (matchedVideo) {
//             return `https://www.youtube.com/watch?v=${matchedVideo.id}`;
//         } else {
//             return `❌ No matching video found for "${contestTitle}"`;
//         }
//     } catch (error) {
//         console.error(`Error fetching playlist for ${contestTitle}:`, error);
//         return `❌ Error fetching data for "${contestTitle}"`;
//     }
// };

// const getContestVideo = async (contestTitle) => {
//     const leetcodeLink = await fetchVideoLink(PLAYLISTS.leetcode, contestTitle);
//     console.log(`✅ LeetCode Video: ${leetcodeLink}`);

//     const codeforcesLink = await fetchVideoLink(PLAYLISTS.codeforces, contestTitle);
//     console.log(`✅ Codeforces Video: ${codeforcesLink}`);

//     const codechefLink = await fetchVideoLink(PLAYLISTS.codechef, contestTitle);
//     console.log(`✅ CodeChef Video: ${codechefLink}`);
// };

// // Example Usage
// getContestVideo("Weekly Contest 441"); // Replace with your desired contest title
