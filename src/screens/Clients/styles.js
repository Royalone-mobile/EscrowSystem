import EStyleSheet from 'react-native-extended-stylesheet';

export const dashboardStyles = EStyleSheet.create({
  
  row: {
    display: 'flex',
    width: '100%',
    alignItems: 'stretch',
    flexDirection: 'row',
    height: '35%',
    borderWidth: 0.1,
    borderBottomWidth: 0,
    borderColor: '#E8E8E8'
  },

  column: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  note: {
    color: '#878787',
    fontSize: '0.8rem',
    marginTop: '0.4rem'
  },
  greenCircle: {
    backgroundColor: '#6EF762',
    borderWidth: 1,
    borderRadius: 30,
    width: '1rem',
    height: '1rem',
    borderColor: 'transparent'
  },
  tagContainer: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    marginTop: '-3rem',
    marginBottom: '2rem'
  },
  tag: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    marginRight: '1rem',
    padding: 6,
    color: 'white'
  }
})