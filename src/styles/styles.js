// styles.js

const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1b1b1b',
  },
  button: {
    backgroundColor: '#f5c542',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0a0a0a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(27, 27, 27, 0.8)',
  },
  // Responsive styles
  mobile: {
    button: {
      width: '100%',
    },
    text: {
      fontSize: 14,
    },
  },
  tablet: {
    button: {
      width: '80%',
    },
    text: {
      fontSize: 16,
    },
  },
};

export default styles;