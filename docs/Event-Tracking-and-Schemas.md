# Event Tracking and Schemas

In order to understand how well (or badly) a banner is performing we track donor events that are sent to external services. Common actions
that are tracked include:

- Banner was seen
- Banner was not shown
- Banner was submitted
- A feature was interacted with

If a new feature is added the performance of that feature is tested by adding it to a VAR banner and comparing it to a CTRL banner. We use
tracking events to see if the feature is interacted with plus the overall performance of each banner is compared to see if there are changes
in donor behavior.

## Domains

We host banners in 2 different places, on wikipedia.org (ORG) and on wikipedia.de (DE). Banners hosted on DE use our self-hosted Matomo
tracking, and banners hosted on ORG use the Wikimedia Event Platform.

### Wikimedia Event Platform (WEP)

This is a very powerful tracking tool that is used to track all events that happen on wikipedia.org.

### Matomo

This is an open source analytics tool. It is very basic compared to the Event Platform meaning we can't track as much as we do on the ORG
banners, but it still works well enough for our purposes.  

## Event Mapping

Banners hosted on either domain fire the same internal events. These are bubbled up to the entry points, and they are then handled by the
appropriate tracking code and sent to 1 of 3 external services. These services are:

1. The 2025 ORG event schema on the WEP.
2. The pre-2025 legacy ORG event schema on the WEP.
3. The DE event schema on Matomo.

### 2025 ORG Schema
This is the schema our internal events were created for and these events map straight to the required structure.

### Pre-2025 ORG Schema & DE Event Schema
Both these schemas require different data structures from our internal events. In the folders of the banners that use these schemas you will find an `event_map.ts` file that handles mapping the internal events to external ones.

### Schemas management on the Wikimedia Event Platform

The Wikimedia Event Platform uses pre-defined schemas to track each event type. That means we need to define and deploy our own schemas
in order to use it. This is done in 2 steps.

#### 1. Add an [Event Stream Configuration Item](https://wikitech.wikimedia.org/wiki/Event_Platform/Stream_Configuration)

Repository: https://gerrit.wikimedia.org/r/q/project:operations/mediawiki-config

This lets the Event Platform know that the schema exists and where it's located. You will need to have [Gerrit](https://www.mediawiki.org/wiki/Gerrit/Tutorial)
set up in order to make a PR there. We have an existing one and you most likely won't ever need to set a new one up.

#### 2. Add (or modify existing) Schemas

Repository: https://gitlab.wikimedia.org/repos/data-engineering/schemas-event-secondary

This contains the configuration for all the events that the Event Platform handles. You will use this to either [create new schemas](https://wikitech.wikimedia.org/wiki/Event_Platform/Schemas#Creating_a_new_schema) or to [modify existing schemas](https://wikitech.wikimedia.org/wiki/Event_Platform/Schemas#Modifying_schemas).

Our schemas consist of 2 parts, the **base schema** and **fragments**. The base schema has no event "field definitions" on its own, but consists of metadata and a list of fragments. Fragments are small sub-schemas that define the "fields" (data points) of the tracking event. 
Think of fragments like includes.

Our schema files are located in:

- Fragments: jsonschema/fragment/analytics/wmde_fundraising/
- Base Schema: jsonschema/analytics/wmde_fundraising/banner_event/web[^1]/

[^1]: web is used because we may eventually show banners in an app and will need a separate base schema for it

**Schema Cheat Sheet**

Here is a small cheat sheet, but please refer to the documentation in the links above for full information on how to create and maintain these schemas.

**Create a new Schema or Fragment**

1. Add a new sub folder, in either in the fragments folder or base schema folder depending on what you're creating.
2. Create a `current.yaml` file and edit it according to the [official documentation](https://wikitech.wikimedia.org/wiki/Event_Platform/Schemas#Creating_a_new_schema).
3. When the `current.yaml` file is ready, run `npm run build-new /path/to/mt/current.yaml` and it will generate the other schema files for you.

**Modify an existing Schema or Fragment**

1. Modify the current.yaml file in the schema you need to change.
2. Make sure to bump the version number of the schema
3. When the current.yaml file is ready run `npm run build-new /path/to/mt/current.yaml` and it will generate the other schema files for you. These files will have the new version number meaning backwards compatibility will not be broken, and old banners can still use the old version.


**F.A.Q.**

_When should I create a new schema?_

Very rarely, as a new one would only be needed if we had a drastically different set of criteria to track. In our banners this is very unlikely to happen.

_When should I create a new Fragment?_

When there is something that needs to be tracked that the current ones can't handle, for example if we wanted to track the current page of the banner slideshow in every event we would need to make a fragment for it and include that in the base schema.

_When should I modify a Fragment or Base Schema?_

Again, very rarely. Each modification will require a bump in version numbers, and adds complexity by making it harder to know which version of the schema a banner should use. This also gives us scope to push back on the stakeholders when they want to track too much.  
