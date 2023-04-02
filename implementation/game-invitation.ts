class GameInvitation {
  link: string;

  constructor(link: string) {
    this.link = link;
  }

  shareLink(): void {
    console.log(`Share this link to invite others to the game: ${this.link}`);
  }
}