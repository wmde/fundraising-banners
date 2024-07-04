# Code and version control organization

Date: 2024-02-15

Deciders: Abban Dunne, Corinna Hillebrand, Gabriel Birke, Tanuja D.

## Status

Accepted


## Context

The following 2 sections describe the status quo until February 2024, see
the section [Decision](#decision) for the changes we make to the status quo

### File Structure
We structured our banner code into four parts:
- Shared components, themes (different SCSS styles for components) and utility classes in `src`. All code in this
    directory must be backwards-compatible to all banners in a campaign.
- Current banner implementation in `banners/CHANNELNAME`. Each channel has
    four parts: 
    - the TypeScript "bootstrap file" (entry point) that
      imports all utility classes for dynamic text, tracking, state
      management, etc. It also initializes the "root component". Typical
      names are `banner_ctrl.ts` and `banner_var.ts`
    - The Banner components (in the `components` folder). Each banner has
        a "root component" that contains all the different banners and
        some state handling, when to show each banner. "Sub-Banners" like
        `MainBanner` or `FallbackBanner` must not contain imports, but
        provide slots instead. All imports happen in the root component.
        In most A/B tests (except for style/design tests) we duplicate the root component.
        component (`BannerCtrl`, `BannerVar`)
    - The content components with texts for the different banners (slides, main text, etc). When we
        A/B test texts, we duplicate the components and add `Ctrl` and
        `Var` suffixes.
    - The `style.scss` file for importing styles from the theme and
        styling the channel-specific components. This can also have a
        `_ctrl` and `_var` version.
- The `archive` folder, where we keep copies of the "current banner" before we begin
    the next one. This folder gets deleted after the campaign, to start
    with a "clean slate".
- The `test` folder 

### Version control strategies and commit structure
For each A/B test in each channel we create a branch, named after the new
campaign. Ideally, each branch has three commits

- The **archive** commit copies the files of the current banner from `banners/CHANNELNAME` into `archive/CHANNELNAME/CAMPAIGN_NAME`
- The **prepare campaign** commit "resets" both Control and Variant files of the
    new banner to the Control *or* Variant files of the previous banner.
    If the previous banner introduced variant files in the channel folder 
    (e.g. styles, additional components, etc), this commit will deleting and/or rename 
    files (e.g. removing the `Ctrl` and `Var` suffixes)
- The **implement variant** commit contains all the changes in
    `banners/CHANNELNAME` and `src` to fulfill the requirement of the
    Variant banner.

### Intents / use cases 

During a banner campaign we need the file structure and version control
strategy for the following use cases:

- When reviewing an A/B test banner, check which files contain changes related to
    the Variant banner. The easiest way to do this is looking at the 3rd commit.
    If a variant has only changes inside the channel folder, this *could*
    also be done by comparing files. But using the Git diff is easier and
    also contains changes to `src`.
- When reviewing a pull request, check if the new Control banner was based on the
    previous Variant or the previous Control banner by looking at the "prepare campaign" commit.
    However, we have developed a good discipline mentioning the base of the new Control
    banner in the commit message and it's easier to read the commit
    message than to look at the diff.
- Do code archaeology to see which banner (and which developer) introduced
    a certain feature in
    a component or a certain change in a theme (nor for blaming them, but
    for resolving questions). The best way to do this, is using the commit
    history.
- "Revive" an old banner (using it as a starting point for a new one).
    This use case is one of the reasons we introduced the `archive`
    folder, because it's easier to copy files from a folder (using `cp` or
    the IDE) than to copy files from a git tag. In cases where the
    original feature branch is not yet merged, we branch off the previous
    feature branch.
- Develop several banners for the same channel in parallel. This happens
    when banner requirements come in quick succession, but there are
    change requests and iterations for the previous feature branches.
    Since we only want to commit code that matches our quality standards,
    we keep iterating on the code while other team members work on new
    banner in a new feature branch.
- Keep backwards compatibility when adding new feature to code in `src` or
    changing a theme.
    The `archive` folder helps with that, because we can look in the IDE for usages.
    In the future, we might introduce more thorough automated tests and
    checks. Keeping strict backwards compatibility is a consequence of the
    "Revive an old banner" use case, where we want the old
    `banners/CHANNELNAME` to work with all the intermediate fixes and
    improvements in `src`.
- The `banners/CHANNELNAME` structure makes it easy to navigate to the
    banner for the current task in the file tree of the IDE/editor/CLI.
- Dependency analysis (not implemented yet): Using tools like [Knip](https://github.com/webpro/knip)
    to detect unused components or to analyze how many of the no-longer
    current banners use a module or component.
- Visualization of the banner evolution (not implemented yet): Answer question 
    like "when did we introduce a component, how many banners use a component,
    how many features start in mobile and go to desktop or vice versa?"
- ??? - Question for the team: Do you see additional "use
    cases"/scenarios where you rely on file structure or version control
    during the campaign?

### Pain points

The commits to `banner/CHANNELNAME` folder work best if they consist of a
consecutive, sequential progression of A/B tests, each test branching off
`main` after the last test was merged. During the 2023 campaign we had
several instances where that was not the case and banner feature branches
branched off other banner feature branches. This led to the following
problems:


In a scenario where we can't branch off `main` branch for a new banner in
the same channel, the workflow hits some snags:

- We get merge and rebase conflicts when we force-push to an un-merged
    earlier branch. It's hard to rebase the "later" branch and resolve its
    conflicts.
- If we merge branches in the wrong order (say Test_24, to able to work on
    Test_25, while Test_23 is still unmerged), it becomes impossible to
    merge earlier tests, because they would appear in the wrong order in
    the succession of merged branches and merging would also resolve the
    wrong conflicts.

These scenarios have happened several times during the 2023 campaign.

## Decision

Instead of the structure `banner/CHANNELNAME`, we have
`banner/CHANNELNAME/CAMPAIGN_NAME`. We can have several banners in
parallel feature branches.

We no longer have an "archive" commit, but in order to help make reviews easier
we keep the 3 commit structure:

1. `Prepare campaign for [CAMPAIGN_NAME]`: When creating a new test, we first
   update the `campaign_info.toml`, and duplicate the folder from the "parent" banner
   (i.e. a previous banner this banner is based on).
2. `Prepare CTRL for [CAMPAIGN_NAME]`: In this commit we prepare the control banner
   using the winner of the previous test as it's base. This will allow reviewers to
   view a diff of the changes made to create the base from the previous test.
3. `Implement VAR for [CAMPAIGN_NAME]`: We then implement the variant banner.

We can now merge banner feature branches in any order, without conflicts
in the banner code. The only conflict that can occur is in
`campaign_info.toml`, but we'll resolve that conflict with the following
rule: Always merge the version that has the higher test number.

We duplicate banner tests in a similar structure as the banners, so we'll have
`tests/banners/CHANNELNAME/CAMPAIGN_NAME` folders.

To get back the uncluttered quick access that the previous, less-nested
structure gave us, we will use Editor/IDE features like "Scopes" in the file
tree of PHPStorm.
