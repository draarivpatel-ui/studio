# Aariv's web studio

I run a small web-design studio as a high-school freshman: **free websites for
charities**, plus tools that keep the build pipeline honest. The studio's
method is unusual and I declare it openly: I direct AI coding agents (OpenCode,
Claude Code, Antigravity) that do the typing, while I plan the sites, write the
specs, review every change and test every page before it ships. The judgement,
standards and final calls are mine.

- Portfolio: https://aariv.me
- Case studies: https://aariv.me/studio-site/ (built by `node build.mjs`, no dependencies)

## Shipped sites

| Site | Kind |
|---|---|
| A foster-based cat rescue | charity, free build |
| A community food pantry | charity, free build |

Each case study records what the site is for and the design decisions behind it,
with a screenshot of the finished site (names and locations covered).

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
