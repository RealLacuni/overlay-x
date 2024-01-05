module.exports = {
    branches: ['main'],
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/changelog',
      '@semantic-release/npm',
      '@semantic-release/github',
      [
        '@semantic-release/exec',
        {
          prepareCmd: 'npm run package-win && npm run package-mac',
        },
      ],
      [
        'semantic-release-electron',
        {
          assets: ['dist/*.exe', 'dist/*.dmg'],
          channel: 'latest',
        },
      ],
      [
        '@semantic-release/git',
        {
          assets: ['CHANGELOG.md', 'package.json'],
          message:
            'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        },
      ],
    ],
  };
  