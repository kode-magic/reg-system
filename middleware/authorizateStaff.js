export default function ({ store, redirect }) {
    if (store.state.staff) {
        if (store.state.user && store.state.user.profileStatus === "Pending")
            return redirect('/staff/profile');
        else return redirect("/staff");
    }
}