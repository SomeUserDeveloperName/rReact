import * as settings from './settings';

const check = () => true;

const checkA = (noteObj) => {

   const resObj = {bool: false, schemaErrorsMap: {/*key: {rule, value}*/}} 
   const refKeysArr = Object.keys(noteRef);
   const reqKeys = refKeysArr.filter((k) => noteRef[k].required === true);
   const notReqKeys = refKeysArr.filter((k) => noteRef[k].required === false);

      const passedRK = _run(reqKeys, noteObj, noteRef, res) 
      const passedNRK = _run(notReqKeys, noteObj, noteRef, res)
                             
   return passedRK.length === reqKeys.length ? {...resObj, {bool: true}} : resObj 
};

const _run = (keysArr, incObj, refObj, resObj) => (keysArr.map(key => {

      const checkedValue = incObj[key];
      const r = refObj[key]['f'](checkedValue, refObj, key)

      if(r === "object"){
         resObj['schemaErrorsMap'] = {...resObj['schemaErrorsMap'], r}  
         return false
      }
      return true 
   }).filter(e => e === true)
  )

const noteRef = {
  id: {
    required: true,
    rule: (a) => `${a}_[\d]{13}`,
    function(v,ref,key){
      return (v.match(`/${rule(ref.dateCreated)}/`)[0] === v || {key: {rule, value: v}})
    }
  },

  name: {
    required: true,
    rule: '[A-Za-z0-9\.,;:!?()"\'%\-]{1,255}',
    function(v,_,key){
      return (v.match(`/${this.rule}/`)[0] === v || {key: {rule, value: v}})
    }
  },

  dateCreated: {
    required: true,
    rule: '(0[1-9]|[12][\d]|3[0-1])\/(0[0-9]|1[0-2])\/20[\d]{2})',
    function(v,_,key){
      return (v.match(`/${this.rule}/`)[0] === v || {key: {rule, value: v}})
    }
  },

  category: {
    required: true,
    rule: settings.categories,
    function(v,_,key){
      return (settings.categories[v.category] !== undefined || {key: {rule, value: v}})
   }
  },

  content: {
    required: true,
    rule: '[A-Za-z0-9\.,;:!?()"\'%\-]{1,255}',
    function(v,_,key){
      return (v.match(`/${this.rule}/`)[0] === v || {key: {rule, value: v}})
    }
  },

  dateEdited: {
    required: false,
    rule: '(0[1-9]|[12][\d]|3[0-1])\/(0[0-9]|1[0-2])\/20[\d]{2})',
    function(v,_,key){
        return (v.match(`/${this.rule}/`)[0] === v || {key: {rule, value: v}})
   }
  },

  archived: {
    required: true,
    rule: 'boolean',
    function(v,_,key){ return (typeof v === this.rule || {key: {rule, value: v}})}
  },
};

export default { check, checkA };
