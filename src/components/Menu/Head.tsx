export const MenuHead = ({ text }: { text: string }) => {

    return <div className="MenuHead">
        <p className="MenuTitle">
            {text}
        </p>
    </div>;
}