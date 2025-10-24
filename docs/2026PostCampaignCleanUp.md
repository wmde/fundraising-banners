# 2026 Post Campaign Clean Up

## Remove ClickAlreadyDonatedEvent

We are tracking clicks on "Already donated" as close events.
We are using `CloseChoices.AlreadyDonated` as a user choice for the close event.

Ticket: https://phabricator.wikimedia.org/T405892#11298820:~:text=Both%20banners%20send%20two%20events%20(with%20different%20names)%20when%20%22Already%20donated%22%20is%20clicked.

### Files to look at:
- src/tracking/events/ClickAlreadyDonatedEvent.ts
