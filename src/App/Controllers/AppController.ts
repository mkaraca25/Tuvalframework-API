import {
    bindState,
    cLeading,
    cTop,
    ForEach,
    HStack,
    Icon,
    ScrollView,
    Spacer,
    State,
    Text,
    TextAlignment,
    TextField,
    TForm,
    UIButton,
    UIController,
    UIScene,
    VStack,
} from '@tuval/forms';

interface Person {
    text: string;
    pNumber:string;
    isComplete: boolean;
}

export class AppController extends UIController {

    @State()
    private menu_text: string;

    @State()
    private PersonList: Person[] = [];

    @State()
    private Person: Person = {
        text: "",
        pNumber:"",
        isComplete: false
    }

    protected BindRouterParams() {
        const Persons = localStorage.getItem("Persons");
        if (!Persons) {
            localStorage.setItem("Persons", JSON.stringify([]));
        } else {
            this.PersonList = JSON.parse(localStorage.getItem("Persons"));
        }
    }

    protected InitController() {
        this.menu_text = "About";
    }

    public OnBindModel(form: TForm) { }

    private getLocalStorage() {
        this.PersonList = []
        this.PersonList = JSON.parse(localStorage.getItem("Persons"))
    }

    private setItemToLocalStorage() {
        this.PersonList.push(this.Person);
        localStorage.setItem("Persons", JSON.stringify(this.PersonList));
        this.Person.text = "";
        this.Person.pNumber="";
        this.getLocalStorage()
    }

    private deleteItemToLocalStorage(index: number) {
        this.PersonList.splice(index, 1)
        localStorage.setItem("Persons", JSON.stringify(this.PersonList));
        this.getLocalStorage()
    }
    private editedItemToLocalStorage() {
        localStorage.setItem("Persons", JSON.stringify(this.PersonList));
        this.getLocalStorage()
    }

    public LoadView() {

        const [selectedIndex, setSelectedIndex] = bindState(-1)

        return UIScene(
            VStack({ alignment: cTop, spacing: 20 })(
                
                HStack(
                    Icon("e7fd").width(10).height(),
                    TextField().marginRight("5px").width()
                        .placeholder("Person Name")
                        .value(this.Person.text)
                        .onTextChange((value) => (this.Person.text = value)),
                        Icon("e0cf").width(10).height(),
                    TextField().marginLeft("5px").padding(20)
                        .placeholder("Person Number").width()
                        .value(this.Person.pNumber)
                        .onTextChange((value) =>(this.Person.pNumber = value)),
                    UIButton(
                        Text("Save").width("70px").background("#423189").marginLeft("10px").padding("5px").foregroundColor("white").cornerRadius(10)
                            .foregroundColor({ hover: "white" }).fontSize(25).fontWeight("lighter")
                    ).onClick(() => {
                        this.setItemToLocalStorage()
                    })
                ).padding("10px 20px")
                    .cornerRadius(10)
                    .background("white")
                    .width(800)
                    .height(50),
                ScrollView({ axes: "cVertical" })
                (Text("Contact List").fontSize(30).foregroundColor("white").fontWeight("lighter").width().height().marginLeft("350px"),
                    VStack({ alignment: cTop, spacing: 10 })(
                        ...ForEach(this.PersonList)((item, index) =>
                        
                            HStack(
                                selectedIndex == index ?
                                
                                    HStack(
                                        TextField().value(item.text)
                                            .onTextChange((value) => this.PersonList[index].text = value)
                                            .backgroundColor("rgba(255,255,255,0.01)")
                                            .marginLeft("10px")
                                            .padding("5px 10px"),
                                            Spacer(),
                                            TextField().value(item.pNumber)
                                            .onTextChange((value) => this.PersonList[index].pNumber = value)
                                            .backgroundColor("rgba(255,255,255,0.01)")
                                            .marginLeft("10px")
                                            .padding("5px 10px"),
                                        UIButton(Text("Edit"))
                                            .padding("10px 10px")
                                            .cornerRadius(5)
                                            .background({ default: "white", hover: "#14A44D" })
                                            .foregroundColor({ hover: "#FBFBFB" })
                                            .transition("all .2s")
                                            .fontWeight("600")
                                            .onClick(() => {
                                                setSelectedIndex(-1)
                                                this.editedItemToLocalStorage()
                                            })
                                    ).width(700).height().padding("5px 0").borderBottom("2px solid lightgray")
                                    :
                                    HStack({ alignment: cLeading, spacing: 10 })(
                                        this.PersonList[index].isComplete == true ?
                                            HStack(
                                                
                                                Text(item.text).padding("5px 10px")
                                                    .fontWeight("600").multilineTextAlignment(TextAlignment.leading),
                                                    Text(item.text).padding("5px 10px")
                                                    .fontWeight("600").multilineTextAlignment(TextAlignment.leading),
                                                Icon("\\e877"),
                                                Text(item.pNumber).padding("5px 10px")
                                                    .fontWeight("600").multilineTextAlignment(TextAlignment.leading),
                                                    Text(item.pNumber).padding("5px 10px")
                                                    .fontWeight("600").multilineTextAlignment(TextAlignment.leading),
                                                Icon("\\e877")
                                            ).width().foregroundColor("#14A44D")
                                            :
                                            HStack(
                                                
                                                Text(item.text).padding("5px 10px").foregroundColor("white")
                                                    .fontWeight("600").multilineTextAlignment(TextAlignment.leading),
                                                Text(item.pNumber).padding("5px 10px").marginLeft("250px").foregroundColor("white")
                                                    .fontWeight("600").multilineTextAlignment(TextAlignment.leading),
                                            ).width().foregroundColor("#3B71CA"),
                                        Spacer(),
                                        UIButton(Text("Edit"))
                                            .padding("10px 10px")
                                            .cornerRadius(5)
                                            .background({ default: "white", hover: "#54B4D3" })
                                            .foregroundColor({ hover: "#FBFBFB" })
                                            .transition("all .2s")
                                            .fontWeight("600")
                                            .onClick(() => {
                                                setSelectedIndex(index)
                                            }),
                                        UIButton(
                                            Text("Delete")
                                        ).onClick(() => this.deleteItemToLocalStorage(index))
                                            .padding("10px 20px")
                                            .cornerRadius(5)
                                            .background({ default: "white", hover: "#DC4C64" })
                                            .foregroundColor({ hover: "#FBFBFB" })
                                            .transition("all .2s")
                                            .fontWeight("600")
                                    ).width(700).height().padding("5px 0").borderBottom("2px solid lightgray")
                            ).width().height(),
                        )
                    )
                ).width(850).backgroundColor("#423189")
            ).padding(50)
        )
    }
}