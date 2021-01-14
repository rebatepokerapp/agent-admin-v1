import React, {useEffect} from 'react'
import {getFiguresAgentLastThreeWeeks} from '../redux/AgentDucks';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {
  ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const LastThreeWeeks = ({byagentid}) => {
  const dispatch = useDispatch();

  moment.updateLocale('en', {
    week: {
      dow : 1, // Monday is the first day of the week.
    }
  });

  const todaydate = new Date()

  var sub = null;
  var byId = false;

  if(byagentid){
    sub = byagentid;
    byId = true;
  }

  useEffect(() => {
    const fetchData = () => {
      dispatch(getFiguresAgentLastThreeWeeks(byId,sub))
    }
    fetchData();
  }, [dispatch, byId, sub])

  const thisweek = moment(todaydate).isoWeek();

  console.log('TODAY DATE', todaydate);
  console.log('THIS WEEK', thisweek);

  const figuresbyweek = useSelector(store => store.agent.lastThreeWeeks);

  console.log('FIGURES BY WEEK', figuresbyweek);

  const data = [
    {
      name: 'Monday', thisweek: 0, lastweek: 0, twoweeksbefore: 0,
    },
    {
      name: 'Tuesday', thisweek: 0, lastweek: 0, twoweeksbefore: 0,
    },
    {
      name: 'Wednesday', thisweek: 0, lastweek: 0, twoweeksbefore: 0,
    },
    {
      name: 'Thursday', thisweek: 0, lastweek: 0, twoweeksbefore: 0,
    },
    {
      name: 'Friday', thisweek: 0, lastweekpv: 0, twoweeksbefore: 0,
    },
    {
      name: 'Saturday', thisweek: 0, lastweek: 0, twoweeksbefore: 0,
    },
    {
      name: 'Sunday', thisweek: 0, lastweek: 0, twoweeksbefore: 0,
    }
  ];

  if(figuresbyweek){
    figuresbyweek.forEach( week => {      
      if(week._id === thisweek){
        week.days.forEach( day => {
          switch(day.day) {
            case 2:
              data[0].thisweek=day.total;
              break;
            case 3:              
              data[1].thisweek=day.total;
              break;
            case 4:
              data[2].thisweek=day.total;
              break;
            case 5:
              data[3].thisweek=day.total;
              break;
            case 6:
              data[4].thisweek=day.total;
              break;
            case 7:
              data[5].thisweek=day.total;
              break;
            case 1:
              data[6].thisweek=day.total;
              break;
            default:
              break;
          }
        })
      }else if(week._id === (thisweek-1)){
        week.days.forEach( day  => {
          switch(day.day) {
            case 2:
              data[0].lastweek=day.total;
              break;
            case 3:
              data[1].lastweek=day.total;
              break;
            case 4:
              data[2].lastweek=day.total;
              break;
            case 5:
              data[3].lastweek=day.total;
              break;
            case 6:
              data[4].lastweek=day.total;
              break;
            case 7:
              data[5].lastweek=day.total;
              break;
            case 1:
              data[6].lastweek=day.total;
              break;
            default:
              break;
          }
        })
      }else if(week._id === (thisweek-2)){
        week.days.forEach( day => {
          switch(day.day) {
            case 2:
              data[0].twoweeksbefore=day.total;
              break;
            case 3:
              data[1].twoweeksbefore=day.total;
              break;
            case 4:
              data[2].twoweeksbefore=day.total;
              break;
            case 5:
              data[3].twoweeksbefore=day.total;
              break;
            case 6:
              data[4].twoweeksbefore=day.total;
              break;
            case 7:
              data[5].twoweeksbefore=day.total;
              break;
            case 1:
              data[6].twoweeksbefore=day.total;
              break;
            default:
              break;
          }
        })
      }
    })
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="thisweek" barSize={20} fill="#413ea0" />
          <Area type="monotone" dataKey="lastweek" fill="#8884d8" stroke="#8884d8" />          
          <Line type="monotone" dataKey="twoweeksbefore" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LastThreeWeeks
