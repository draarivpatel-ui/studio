# Aariv's web studio

I run a small web-design studio as a high-school freshman: **free websites for
charities**, plus tools that keep the build pipeline honest. The studio's
method is unusual and I declare it openly: I direct AI coding agents (OpenCode,
Claude Code, Antigravity) that do the typing, while I plan the sites, write the
specs, review every change and test every page before it ships. The judgement,
standards and final calls are mine.

- Portfolio: https://aariv.me
- Case studies: run `node build.mjs` and open `dist/index.html` (no dependencies)

## Shipped sites

| Site | Kind | Live |
|---|---|---|
| The Sunshine Fund (Houston foster cat rescue) | charity, free build | https://the-sunshine-fund-houston.netlify.app/ |
| East Spring Branch Food Pantry (Houston, TX) | charity, free build | https://east-spring-branch-food-pantry.netlify.app/ |

Each case study records what the site is for and the design decisions behind it,
with a current screenshot from the live deployment.

## Open-source tools from the studio

- [Regatta](https://github.com/draarivpatel-ui/regatta) - macOS app that runs several AI coding agents at once, with safety rails for repo-changing operations
- [wasitme](https://github.com/draarivpatel-ui/wasitme) - "was it me, or the model?" timeline of what changed in your Claude Code / Codex sessions
- [armillary](https://github.com/draarivpatel-ui/armillary) - private archive of every AI coding agent's session history
- [busyholm](https://github.com/draarivpatel-ui/busyholm) - a papercraft river island that grows from real agent activity

## Build

```sh
node build.mjs   # renders dist/ from sites.json
```

## License

Code MIT. Screenshots and site content belong to their owners.
