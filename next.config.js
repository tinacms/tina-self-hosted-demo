module.exports = {
  transpilePackages: [
    "tinacms",
    "tinacms-authjs",
    "@tinacms/datalayer",
    "tinacms-gitprovider-github",
    "@heroicons/react",
  ],
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
};
