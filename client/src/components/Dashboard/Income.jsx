export const Income = () => {
    return (
        <form style={{
            display:'flex', 
            flexDirection:'column',
            alignItems:'center'
        }}>
            <div>
                <label>How much do you make at your current job?</label>
                <input id='anualsalary'/>
            </div>
            <div>
                <label>How much do you make each week?</label>
                <input id='weeklypay'/>
            </div>
            <div>
                <label>How much do you want to make this year?</label>
                <input id='anualgoal'/>
            </div>
            <div>
                <label>How much do you want to save this year?</label>
                <input id='anualsavegoal'/>
            </div>

        </form>
    )
}