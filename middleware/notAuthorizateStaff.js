export default function ({ store, redirect }) {
    if (!store.state.staff) {
        return redirect("/");
    } else {
        if (store.state.user && store.state.user.profileStatus === "Pending")
            return redirect('/staff/profile');

    }
}