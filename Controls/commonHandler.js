export default async function commonHandler(view){
    this.partials = {
        header: await this.load('../Views/common/header.hbs'),
        footer: await this.load('../Views/common/footer.hbs'),
        notifications: await this.load('../Views/common/notifications.hbs')
    }
    if (view) {
        await this.partial(view)
    }
}